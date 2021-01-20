import { response } from "express";
import ApiError from "../error/ApiError.js";
import { fetchTopPostsFromSubreddit } from "../util/apiUtil.js";
import { filterSubredditListingData } from "../util/apiUtil.js";

export const getTopPostsFromSubreddit = (req, res, next) => {
  if (subreddit === null) {
    next(ApiError.badRequest(`Query parameter ${subreddit} cannot be null`));
    return;
  }
  var subreddit = req.params.subreddit;
  var timeframe = req.query.timeframe;
  var limit = req.query.limit ? req.query.limit : 25;
  fetchTopPostsFromSubreddit(subreddit, timeframe, limit)
    .then((response) => {
      if (response.data.data && !response.data.data.dist) {
        next(ApiError.badRequest(`Subreddit ${subreddit} does not exist`));
        return;
      }
      return res.json(filterSubredditListingData(response.data));
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 403) {
          next(ApiError.badRequest(`Subreddit ${subreddit} is private`));
          return;
        }
        if (error.response.status == 404) {
          next(ApiError.badRequest(`Subreddit ${subreddit} does not exist`));
          return;
        }
        next(ApiError.internalError("Request failed..."));
      }
    });
};

export const getHotPostsFromSubreddit = (req, res, next) => {
  res.send("Get hot posts from subreddit");
};
