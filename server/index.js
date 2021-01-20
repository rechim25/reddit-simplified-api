import axios from "axios";
import express from "express";
import apiErrorHandler from "./error/api-error-handler.js";
import cors from "cors";
import bodyParser from "body-parser";
import subredditRoutes from "./routes/api/subreddit.js";

axios.defaults.baseURL = "http://reddit.com";
// set axios modhash in header

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/subreddit", subredditRoutes); // redirect all /api/posts to /posts
app.use(apiErrorHandler);

if (process.env.NODE_ENV === "production") {
  // Use '/public' as static folder in production
  app.use(express.static(__dirname + "/public"));
  // Redirect all get requests to index.html (except if actual endpoints are hit)
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

export function getAxios() {
  return axios;
}
