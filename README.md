# Reddit Simplified API

> Reddit Simplified is an application that allows users to check on their favorite subreddits. It provides a simple, responsive interface from where anyone can see the top posts of a subreddit on a given timeframe. Moreover, the server provides a public REST API that can retrieve useful data from the Reddit API, eliminating the complex, unnecessary datas that Reddit provides on subreddit posts.
## Technologies:

- Vue.js: used for building the single page web application.
- Node.js: server, JavaScript runtime.
- Express.js: used for building the API, serves web applciation to client.
- Axios.js: HHTP library used for fetching data from Reddit API.
- Jest: unit and functional testing.

This repository contains the single page web application (in `/client`) as a git submodule and server application (in `/server`).

[Check out this running deployment of the application](https://intense-crag-67403.herokuapp.com/)

#Installation

Ensure you have `npm`, `nodejs` installed.

After you have cloned the repository, you must initialize the client submodule:

- `git submodule init`
- `git submodule update`, this will fetch the client submodule into your local repo.

To start the application:
- `npm i` in the root folder.
- To begin server development: `npm run dev`
- To begin client development: `npm run serve`

Building client for production by generating the static assets in `/server/public`:
- To build client for production: `npm run build`. 

# Server Documentation

## Overview

- Server runs Node.js.
- Client application build using Vue.js, packed as a static asset which is served by express
- Server API fetches data from Reddit API `https://reddit.com/r/:subreddit/top/.json`.
- When the API route `/api/subreddit/:subreddit` is hit, server fetches data from Reddit API with query parameters specified in the query string of the client request. Then it parses and filters the retrieved data accordingly to eliminate redundant and unuseful information. This is then served to the client in JSON format.

#Client

The UI is simple, as is the data retrieved by our API.

When the user searches for top posts on a subreddit given in the input text area in the format without `/r`, the client makes a get request to our server. The server API has been designed to retrieve all the necessary data for the client to display posts. 

# Server API Routes

## `/api/subreddit/:subreddit`

### GET

Query parameters:

- `timeframe` = "day" | "now" | "week" | "month" | "year" | "all" (default = "day).
- `limit`     = integer value greater than 0 (default = 25).

#API Errors:

Custom error handling has been implemented using the `/server/error/api-error-handler.js` middleware. 

If an error is encountered during or after fetching (decided based on Reddit API response), then this middleware will be given an `ApiError` object which contains the following parameters:
- `code`: the error code.
- `msg`: the message, used to identify the cause of the error.

The `msg` parameter comes in handy, as it provides a description of the error, which will then be used in the client:
- 400: Subreddit does not exist.
- 400: Subreddit is private.
- 500: Request failed (internal server error).

