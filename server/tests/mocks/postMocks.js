/*
 * Mocks below are what is possible to expect from Reddit API
 */

export const galleryMock = {
  items: [
    {
      media_id: "test_id_1",
      caption: "test_caption_1",
      gibberish: "aaaaaaa",
    },
    {
      media_id: "test_id_2",
      caption: "test_caption_2",
      gibberish: "aaaaaaa",
    },
    null,
  ],
};

export const galleryPostDataMock = (option) => {
  let gallery_option;
  if (option === "empty") {
    gallery_option = [];
  } else if (option === "with") {
    gallery_option = galleryMock;
  } else {
    gallery_option = null;
  }
  return {
    name: "test_name",
    author: "test_author",
    title: "test_title",
    selftext: "test_text",
    is_gallery: true,
    gallery_data: gallery_option,
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
  };
};

export const mediaEmbedMock = {
  content:
    '<iframe class="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fgfycat.com%2Fifr%2Fterribleunfinishedafghanhound&display_name=Gfycat&url=https%3A%2F%2Fgfycat.com%2Fterribleunfinishedafghanhound&image=https%3A%2F%2Fthumbs.gfycat.com%2FTerribleUnfinishedAfghanhound-size_restricted.gif&key=2aa3c4d5f3de4f5b9120b660ad850dc9&type=text%2Fhtml&schema=gfycat" width="480" height="480" scrolling="no" title="Gfycat embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>',
};

export const mediaEmbedPostDataMock = (option) => {
  let media_embed_option;
  if (option === "empty") {
    media_embed_option = {};
  } else if (option === "with") {
    media_embed_option = {
      content:
        '<iframe class="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fgfycat.com%2Fifr%2Fterribleunfinishedafghanhound&display_name=Gfycat&url=https%3A%2F%2Fgfycat.com%2Fterribleunfinishedafghanhound&image=https%3A%2F%2Fthumbs.gfycat.com%2FTerribleUnfinishedAfghanhound-size_restricted.gif&key=2aa3c4d5f3de4f5b9120b660ad850dc9&type=text%2Fhtml&schema=gfycat" width="480" height="480" scrolling="no" title="Gfycat embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe>',
      width: 480,
      scrolling: false,
      height: 480,
    };
  } else {
    media_embed_option = null;
  }
  return {
    name: "test_name",
    author: "test_author",
    title: "test_title",
    selftext: "test_text",
    media_embed: media_embed_option,
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
  };
};

export const videoPostDataMock = (option) => {
  let video_option;
  if (option === "with") {
    video_option = {
      reddit_video: {
        bitrate_kbps: 4800,
        fallback_url:
          "https://v.redd.it/23cu7kaechc61/DASH_1080.mp4?source=fallback",
        height: 1080,
        width: 607,
        scrubber_media_url: "https://v.redd.it/23cu7kaechc61/DASH_96.mp4",
        dash_url:
          "https://v.redd.it/23cu7kaechc61/DASHPlaylist.mpd?a=1613816150%2CYjM1NjEwZTNhOTBkYjk3ZDE1MDA0M2ViNThlMGI5YjgxZDUxZTcwMDEzMTk5ZWJiMjIxZGM1N2EyMmU0ZTNkNg%3D%3D&v=1&f=sd",
        duration: 20,
        hls_url:
          "https://v.redd.it/23cu7kaechc61/HLSPlaylist.m3u8?a=1613816150%2CZGJkOGI2NzFiMTRlNDIyNGI5N2VhNTkwNmY5ZjViZTA1MmVkNzY0ZTQyZDU3MjUyY2FkOGU1MjcwZTE1MTM1Ng%3D%3D&v=1&f=sd",
        is_gif: false,
        transcoding_status: "completed",
      },
    };
  } else if (option === "empty") {
    video_option = {};
  } else {
    video_option = null;
  }
  return {
    name: "test_name",
    author: "test_author",
    title: "test_title",
    selftext: "test_text",
    media: video_option,
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    is_video: true,
  };
};

export const crossPostDataMock = (option) => {
  let crosspost_option;
  if (option === "empty") {
    crosspost_option = {};
  } else if (option === "with") {
    crosspost_option = {
      name: "test_name",
      author: "test_author",
      title: "test_title",
      selftext: "test_text",
      url_overridden_by_dest: "https://i.redd.it/5bwzi1b2bkc61.png",
      num_comments: "test_num_comments",
      ups: "test_ups",
      downs: "test_downs",
      permalink: "test_permalink",
    };
  } else {
    crosspost_option = null;
  }
  return {
    name: "test_name",
    author: "test_author",
    title: "test_title",
    selftext: "test_text",
    crosspost_parent_list: [crosspost_option],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
  };
};

export const singleImagePostMock = {
  name: "test_name",
  author: "test_author",
  title: "test_title",
  selftext: "test_text",
  url_overridden_by_dest: "https://i.redd.it/5bwzi1b2bkc61.png",
  num_comments: "test_num_comments",
  ups: "test_ups",
  downs: "test_downs",
  permalink: "test_permalink",
  subreddit_subscribers: 100,
};

export const listingDataMock = (option) => {
  if (option === "empty_listing") {
    return {};
  }
  if (option === "empty_data") {
    return {
      kind: "Listing",
      data: {},
    };
  }
  if (option === "null_data") {
    return {
      kind: "Listing",
      data: null,
    };
  }
  if (option === "empty_children") {
    return {
      kind: "Listing",
      data: {
        children: [],
      },
    };
  }
  if (option === "null_children") {
    return {
      kind: "Listing",
      data: {
        children: null,
      },
    };
  }
  if (option === "with") {
    return {
      kind: "Listing",
      data: {
        children: [
          {
            kind: "t3",
            data: singleImagePostMock,
          },
        ],
      },
    };
  }
  return null;
};

export const subscriberCountMock = {
  multi_post: [
    { data: { subreddit_subscribers: 10 } },
    { data: { subreddit_subscribers: 8 } },
  ],
  no_post: [],
  null_post: null,
};
