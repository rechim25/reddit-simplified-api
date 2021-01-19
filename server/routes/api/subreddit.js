import express, { response } from 'express';
import { getTopPostsFromSubreddit } from  '../../controller/subreddit-controller.js'

const router = express.Router();

router.get('/', async (req, res) => {
    // TODO: return top subreddits on Reddit
    res.send("Hello");
});

router.route('/:subreddit').get(getTopPostsFromSubreddit);

export default router;