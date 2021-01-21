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
    return null;
  }
  var posts = listing.data.children || [];
  var filteredPosts = posts
    .map((post) => {
      if (post.data && post.kind == "t3") {
        return filterSubredditTypeT3Data(post.data);
      }
    })
    .filter((post) => post);
  return {
    subscriber_count: getSubscriberCount(posts),
    count: posts.length,
    posts: filteredPosts,
  };
};

export const filterSubredditTypeT3Data = (data) => {
  if (!data || Object.keys(data).length <= 0) {
    return null;
  }

  var images_data, video_data;
  if (isGallery(data)) {
    images_data = filterImageGallery(data.gallery_data.items);
  } else if (isMediaEmbed(data)) {
    video_data = filterEmbeddedMedia(
      data.secure_media_embed || data.media_embed
    );
  } else if (isVideo(data)) {
    video_data = data.media.reddit_video
      ? data.media.reddit_video.fallback_url
      : null;
  } else if (isCrossPost(data)) {
    return filterSubredditTypeT3Data(data.crosspost_parent_list[0]);
  } else if (data.url_overridden_by_dest) {
    images_data = [{ url: data.url_overridden_by_dest }];
  }

  return {
    id: data.name || null,
    author: data.author || null,
    title: data.title || null,
    text: data.selftext || null,
    images: images_data || [],
    video: video_data || null,
    num_comments: data.num_comments || null,
    ups: data.ups || null,
    downs: data.downs || null,
    created_utc: data.created_utc || null,
    banned_utc: data.banned_at_utc || null,
    permalink: data.permalink || null,
  };
};

export const filterImageGallery = (gallery_items) => {
  if (!gallery_items) {
    return [];
  }
  return gallery_items.map((img) => {
    if (!img) {
      return {};
    }
    return {
      url: getImageUrl(img.media_id),
      caption: img.caption,
      media_id: img.media_id,
    };
  });
};

export const filterEmbeddedMedia = (embed) => {
  let dom = new JSDOM(embed.content);
  return dom.window.document.querySelector("iframe").getAttribute("src");
};

const getImageUrl = (media_id) => {
  return `https://i.redd.it/${media_id}.png`;
};

export const getSubscriberCount = (posts) => {
  if (posts && posts.length > 0) {
    return posts[0] && posts[0].data ? posts[0].data.subreddit_subscribers : 0;
  }
  return 0;
};

export const isGallery = (data) => {
  return data.is_gallery && data.gallery_data;
};

export const isMediaEmbed = (data) => {
  if (data.secure_media_embed) {
    return Object.keys(data.secure_media_embed).length != 0;
  }
  if (data.media_embed) {
    return Object.keys(data.media_embed).length != 0;
  }
  return false;
};

export const isVideo = (data) => {
  return data.is_video && data.media;
};

export const isCrossPost = (data) => {
  if (data.crosspost_parent_list) {
    return data.crosspost_parent_list.length > 0;
  }
  return false;
};
