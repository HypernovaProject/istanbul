import express, { Request, Response } from 'express';
import { table, row } from 'rethinkdb';
import bodyParser from 'body-parser';

import checkPosts from '../../utils/checkPosts';
import auth from '../../middleware/authToken';
import prod from '../../utils/prodDatabase';
import Post from '../../interfaces/Post';

const router = express.Router();
const parser = bodyParser.json();

router.post('/', parser, auth, async (req: Request, res: Response) => {
    /* Check if all JSON values were sent */
    if (!req.body.post.name || !req.body.post.author)
        return res.status(400).json({ message: 'Some data is missing. Please try again!.' });

    /* Check whether a post with the same content or name exists */
    const conditionalPost: Promise<Post> = checkPosts(req.body.post.name);

    if ((await (await conditionalPost).postData) != req.body.post.data) {
        res.status(400).json({ message: 'A post with this content does not exist.' });
    } else if ((await (await conditionalPost).postName) != req.body.post.name) {
        res.status(400).json({ message: 'A post by this user does not exist.' });
    }

    /* Highly Unlikely Case */
    if ((await await conditionalPost) && (await (await conditionalPost).postAuthor) != req.body.post.author)
        res.status(400).json({ message: 'Imposter effect. Request was made under anauthorized personality.' });

    /* Asynchronous Data Deletion */
    await table('posts')
        .filter(row('postName').eq(req.body.post.name))
        .delete()
        .run(await prod());
    res.status(200).json({ message: 'Deleted successfully!' });
});

export default router;
