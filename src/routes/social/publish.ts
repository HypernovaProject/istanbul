import express, { Request, Response } from 'express';
import { table } from 'rethinkdb';
import bodyParser from 'body-parser';
import moment from 'moment';

import checkPosts from '../../utils/checkPosts';
import auth from '../../middleware/authToken';
import prod from '../../utils/prodDatabase';
import Post from '../../interfaces/Post';

const router = express.Router();
const parser = bodyParser.json();

router.post('/', parser, auth, async (req: Request, res: Response) => {
    /* Check if all JSON values were sent */
    if (!req.body.post.name || !req.body.post.data || !req.body.post.author || !req.body.post.thumbnail_url)
        return res.status(400).json({ message: 'Some data is missing. Please try again!.' });

    /* Check whether a post with the same content or name exists */
    const conditionalPost: Promise<Post> = checkPosts(req.body.post.name);

    if ((await (await conditionalPost).postData) == req.body.post.data) {
        res.status(400).json({ message: 'A post with this content already exists.' });
    } else if ((await (await conditionalPost).postName) == req.body.post.name) {
        res.status(400).json({ message: 'A post with this name already exists.' });
    }

    /* Highly Unlikely Case */
    if ((await conditionalPost) && (await (await conditionalPost).postAuthor) != req.body.post.author)
        res.status(400).json({ message: 'Imposter alert! Request was made under anauthorized personality.' });

    /* Define the to-be-posted item */
    const post: Post = {
        postName: req.body.post.name,
        postData: req.body.post.data,
        postAuthor: req.body.post.author,
        postThumbnail: req.body.post.thumbnail_url,
        createdAt: moment().format('LLLL'),
    };

    /* Asynchronous Data Insertion */
    await table('posts')
        .insert([post])
        .run(await prod());
    res.status(200).json({ message: 'Inserted successfully!', posted: post });
});

export default router;
