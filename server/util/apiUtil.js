import { getAxios } from '../index.js';
import { JSDOM } from 'jsdom';

const axios = getAxios();

export const fetchTopPostsFromSubreddit = async (subreddit, timeframe, limit) => {
    console.log(subreddit);
    console.log(timeframe);
    return axios.get(`/r/${subreddit}/top/.json?t=${timeframe}&limit=${limit}&raw_json=1`);
}

export const filterSubredditListingData = (listing) => {
    if (!listing || listing.kind != "Listing" || !listing.data) {
        return;
    }
    var posts = listing.data.children;
    posts = posts.map(post => {
        if (post.data && post.kind == "t3") {
            return filterSubredditTypeT3Data(post);
        }
    });  
    return {
        count: posts.length,
        posts,
    };  
}

const filterSubredditTypeT3Data = (t3_post) => {
    if (!t3_post || !t3_post.data) {
        return;
    }

    var data = t3_post.data, images_data, video_data;
    if (data.is_gallery && data.gallery_data) {
        console.log("gallery");
        images_data = filterImageGallery(data.gallery_data.items);
    } else if (Object.keys(data.media_embed).length != 0 || Object.keys(data.secure_media_embed).length != 0) {
        // Gifs and embeded videos
        video_data = filterEmbeddedMedia(data.secure_media_embed || data.media_embed);
        console.log("\n" + data.author + " embedded video: " + video_data + " " + JSON.stringify(video_data));
    } else if (data.is_video && data.is_reddit_media_domain) {
        // Reddit hosted videos
        video_data = data.media.reddit_video ? data.media.reddit_video.fallback_url : null;
        console.log("\n" + data.author + " reddit video: " + video_data);
    } else {
        images_data = [data.url_overridden_by_dest];  
        console.log("\n" + data.author + " image: " + images_data);
    }
    return {
        "author":  data.author,
        "title": data.title,
        "text": data.selftext,
        "time_since": 0,
        "images": images_data,
        "video": video_data,
        "ups": data.ups,
        "downs": data.downs,
    }
    // for videos: check is_video first
    // go to .secure_media, then .reddit_video then .reddit_video.fallback_url
    // <video controls autoplay="" loop="">
    // <source src="https://v.redd.it/slpv3tp210c61/DASH_480.mp4?source=fallback" type="video/mp4">
    // <source src="https://v.redd.it/slpv3tp210c61/DASH_480.mp4?source=fallback" type="video/ogg">
    // </video>
    // if its not reddit_video put unsupported or smth
}

const filterImageGallery = (gallery_items) => {
    if (!gallery_items) {
        return [];
    }
    return gallery_items.map(img => ({
                url: getImageUrl(img.media_id),
                caption: img.caption,
                media_id: img.media_id,
            })); 
}

const filterEmbeddedMedia = (embed) => {
    let dom = new JSDOM(embed.content);
    return dom.window.document.querySelector('iframe').getAttribute('src');
}


const getImageUrl = (media_id) => {
    return `https://i.redd.it/${media_id}.png`;
}