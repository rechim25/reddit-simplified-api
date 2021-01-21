import {
  mediaEmbedMock,
  galleryMock,
  subscriberCountMock,
  galleryPostDataMock,
  mediaEmbedPostDataMock,
  videoPostDataMock,
  crossPostDataMock,
  singleImagePostMock,
  listingDataMock,
} from "./mocks/postMocks.js";

import {
  filterEmbeddedMedia,
  filterImageGallery,
  getSubscriberCount,
  filterSubredditTypeT3Data,
  isMediaEmbed,
  filterSubredditListingData,
} from "../util/apiUtil.js";

/*
 * Test gallery filter
 */
test("filter reddit post data with image gallery", () => {
  expect(filterSubredditTypeT3Data(galleryPostDataMock("with"))).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    images: [
      {
        url: `https://i.redd.it/test_id_1.png`,
        caption: "test_caption_1",
        media_id: "test_id_1",
      },
      {
        url: `https://i.redd.it/test_id_2.png`,
        caption: "test_caption_2",
        media_id: "test_id_2",
      },
      {},
    ],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
    video: null,
  });
});

test("filter reddit post data with empty image gallery", () => {
  expect(filterSubredditTypeT3Data(galleryPostDataMock("empty"))).toStrictEqual(
    {
      id: "test_name",
      author: "test_author",
      title: "test_title",
      text: "test_text",
      images: [],
      num_comments: "test_num_comments",
      ups: "test_ups",
      downs: "test_downs",
      permalink: "test_permalink",
      banned_utc: null,
      created_utc: null,
      video: null,
    }
  );
});

test("filter reddit post data with null image gallery", () => {
  expect(filterSubredditTypeT3Data(galleryPostDataMock("null"))).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    images: [],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
    video: null,
  });
});

/*
 * Test media embed filter
 */
test("filter reddit post data with media embed", () => {
  expect(
    filterSubredditTypeT3Data(mediaEmbedPostDataMock("with"))
  ).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video:
      "https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fgfycat.com%2Fifr%2Fterribleunfinishedafghanhound&display_name=Gfycat&url=https%3A%2F%2Fgfycat.com%2Fterribleunfinishedafghanhound&image=https%3A%2F%2Fthumbs.gfycat.com%2FTerribleUnfinishedAfghanhound-size_restricted.gif&key=2aa3c4d5f3de4f5b9120b660ad850dc9&type=text%2Fhtml&schema=gfycat",
    images: [],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

test("filter reddit post data with null media embed", () => {
  expect(
    filterSubredditTypeT3Data(mediaEmbedPostDataMock("null"))
  ).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video: null,
    images: [],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

test("filter reddit post data with empty media embed", () => {
  expect(
    filterSubredditTypeT3Data(mediaEmbedPostDataMock("empty"))
  ).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video: null,
    images: [],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

/*
 * Test video filter
 */
test("check", () => {
  expect(
    videoPostDataMock("with").media.reddit_video.fallback_url
  ).toStrictEqual(
    "https://v.redd.it/23cu7kaechc61/DASH_1080.mp4?source=fallback"
  );
});

test("filter reddit post data with video", () => {
  expect(filterSubredditTypeT3Data(videoPostDataMock("with"))).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video: "https://v.redd.it/23cu7kaechc61/DASH_1080.mp4?source=fallback",
    images: [],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

test("filter reddit post data empty with video", () => {
  expect(filterSubredditTypeT3Data(videoPostDataMock("empty"))).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video: null,
    images: [],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

test("filter reddit post data null with video", () => {
  expect(filterSubredditTypeT3Data(videoPostDataMock("null"))).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video: null,
    images: [],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

/*
 * Test crosspost filter
 */
test("filter reddit crosspost data", () => {
  expect(filterSubredditTypeT3Data(crossPostDataMock("with"))).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video: null,
    images: [{ url: "https://i.redd.it/5bwzi1b2bkc61.png" }],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

test("filter reddit crosspost with empty data", () => {
  expect(filterSubredditTypeT3Data(crossPostDataMock("empty"))).toStrictEqual(
    null
  );
});

test("filter reddit crosspost with null data", () => {
  expect(filterSubredditTypeT3Data(crossPostDataMock("null"))).toStrictEqual(
    null
  );
});

/*
 * Test single image filter
 */
test("filter reddit post data with single image", () => {
  expect(filterSubredditTypeT3Data(singleImagePostMock)).toStrictEqual({
    id: "test_name",
    author: "test_author",
    title: "test_title",
    text: "test_text",
    video: null,
    images: [{ url: "https://i.redd.it/5bwzi1b2bkc61.png" }],
    num_comments: "test_num_comments",
    ups: "test_ups",
    downs: "test_downs",
    permalink: "test_permalink",
    banned_utc: null,
    created_utc: null,
  });
});

/*
 * Test gallery filter
 */
test("filter reddit image gallery object", () => {
  expect(filterImageGallery(galleryMock.items)).toStrictEqual([
    {
      url: `https://i.redd.it/test_id_1.png`,
      caption: "test_caption_1",
      media_id: "test_id_1",
    },
    {
      url: `https://i.redd.it/test_id_2.png`,
      caption: "test_caption_2",
      media_id: "test_id_2",
    },
    {},
  ]);
});

/*
 * Test listing filter
 */
test("filter listing with posts", () => {
  expect(filterSubredditListingData(listingDataMock("with"))).toStrictEqual({
    subscriber_count: 100,
    count: 1,
    posts: [
      {
        id: "test_name",
        author: "test_author",
        title: "test_title",
        text: "test_text",
        images: [{ url: "https://i.redd.it/5bwzi1b2bkc61.png" }],
        video: null,
        num_comments: "test_num_comments",
        ups: "test_ups",
        downs: "test_downs",
        permalink: "test_permalink",
        banned_utc: null,
        created_utc: null,
      },
    ],
  });
});

test("filter empty listing", () => {
  expect(
    filterSubredditListingData(listingDataMock("empty_listing"))
  ).toStrictEqual(null);
});

test("filter listing with empty data", () => {
  expect(
    filterSubredditListingData(listingDataMock("empty_data"))
  ).toStrictEqual({ count: 0, posts: [], subscriber_count: 0 });
});

test("filter listing with null data", () => {
  expect(
    filterSubredditListingData(listingDataMock("null_data"))
  ).toStrictEqual(null);
});

test("filter listing with empty chidlren", () => {
  expect(
    filterSubredditListingData(listingDataMock("empty_children"))
  ).toStrictEqual({ count: 0, posts: [], subscriber_count: 0 });
});

test("filter listing with null children", () => {
  expect(
    filterSubredditListingData(listingDataMock("null_children"))
  ).toStrictEqual({ count: 0, posts: [], subscriber_count: 0 });
});

test("filter null listing", () => {
  expect(filterSubredditListingData(listingDataMock("null"))).toStrictEqual(
    null
  );
});

/*
 * Test embedded media filter
 */
test("get src link of embedded reddit media", () => {
  expect(filterEmbeddedMedia(mediaEmbedMock)).toBe(
    "https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fgfycat.com%2Fifr%2Fterribleunfinishedafghanhound&display_name=Gfycat&url=https%3A%2F%2Fgfycat.com%2Fterribleunfinishedafghanhound&image=https%3A%2F%2Fthumbs.gfycat.com%2FTerribleUnfinishedAfghanhound-size_restricted.gif&key=2aa3c4d5f3de4f5b9120b660ad850dc9&type=text%2Fhtml&schema=gfycat"
  );
});

/*
 * Test subscriber count filter
 */
test("get subscriber count from posts", () => {
  expect(getSubscriberCount(subscriberCountMock.multi_post)).toBe(10);
});

test("get subscriber count from empty posts", () => {
  expect(getSubscriberCount(subscriberCountMock.no_post)).toBe(0);
});

test("get subscriber count from null posts", () => {
  expect(getSubscriberCount(subscriberCountMock.null_post)).toBe(0);
});

/*
 * Test embed media classifier
 */
test("is post data media embed", () => {
  expect(isMediaEmbed(mediaEmbedPostDataMock("with"))).toStrictEqual(true);
});
