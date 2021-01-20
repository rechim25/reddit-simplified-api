import { getAxios } from "../index.js";
import { JSDOM } from "jsdom";

const axios = getAxios();

export const fetchTopPostsFromSubreddit = async (
  subreddit,
  timeframe,
  limit
) => {
  return axios.get(
    `/r/${subreddit}/top/.json?t=${timeframe}&limit=${limit}&raw_json=1`
  );
};

export const filterSubredditListingData = (listing) => {
  if (!listing || listing.kind != "Listing" || !listing.data) {
    return;
  }
  var posts = listing.data.children;
  var filteredPosts = posts.map((post) => {
    if (post.data && post.kind == "t3") {
      return filterSubredditTypeT3Data(post.data);
    }
  });
  return {
    subcriber_count: getSubscriberCount(posts),
    count: posts.length,
    posts: filteredPosts,
  };
};

const filterSubredditTypeT3Data = (data) => {
  if (!data) {
    return;
  }

  var images_data, video_data;
  if (data.is_gallery && data.gallery_data) {
    images_data = filterImageGallery(data.gallery_data.items);
  } else if (
    Object.keys(data.media_embed).length != 0 ||
    Object.keys(data.secure_media_embed).length != 0
  ) {
    // Gifs and embeded videos
    video_data = filterEmbeddedMedia(
      data.secure_media_embed || data.media_embed
    );
  } else if (data.is_video) {
    // Reddit hosted videos
    video_data = data.media.reddit_video
      ? data.media.reddit_video.fallback_url
      : null;
  } else if (
    data.crosspost_parent_list &&
    data.crosspost_parent_list.length > 0
  ) {
    return filterSubredditTypeT3Data(data.crosspost_parent_list[0]);
  } else {
    images_data = [{ url: data.url_overridden_by_dest }];
  }

  return {
    id: data.name,
    author: data.author,
    title: data.title,
    text: data.selftext,
    images: images_data,
    video: video_data,
    num_comments: data.num_comments,
    ups: data.ups,
    downs: data.downs,
    created_utc: data.created_utc,
    banned_utc: data.banned_at_utc,
    permalink: data.permalink,
  };
  // for videos: check is_video first
  // go to .secure_media, then .reddit_video then .reddit_video.fallback_url
  // <video controls autoplay="" loop="">
  // <source src="https://v.redd.it/slpv3tp210c61/DASH_480.mp4?source=fallback" type="video/mp4">
  // <source src="https://v.redd.it/slpv3tp210c61/DASH_480.mp4?source=fallback" type="video/ogg">
  // </video>
  // if its not reddit_video put unsupported or smth
};

const filterImageGallery = (gallery_items) => {
  if (!gallery_items) {
    return [];
  }
  return gallery_items.map((img) => ({
    url: getImageUrl(img.media_id),
    caption: img.caption,
    media_id: img.media_id,
  }));
};

const filterEmbeddedMedia = (embed) => {
  let dom = new JSDOM(embed.content);
  return dom.window.document.querySelector("iframe").getAttribute("src");
};

const getImageUrl = (media_id) => {
  return `https://i.redd.it/${media_id}.png`;
};

const getSubscriberCount = (posts) => {
  if (posts && posts.length > 0) {
    return posts[0] && posts[0].data ? posts[0].data.subreddit_subscribers : 0;
  }
  return 0;
};

const isGallery = (data) => {
  return data.is_gallery && data.gallery_data;
};
