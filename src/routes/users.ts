import express, { Request, Response } from 'express';
import { table, row } from 'rethinkdb';
import bodyParser from 'body-parser';

import auth from '../middleware/authToken';
import prod from '../utils/prodDatabase';
import User from '../interfaces/User';

const router = express.Router();
const parser = bodyParser.json();

router.get('/', parser, auth, async (req: Request, res: Response) => {
    if (!req.body || !req.body.username) return res.json({ message: "Missing 'user' query" });
    const user: User = (
        await table('users')
            .filter(row('username').eq(req.body.username))
            .run(await prod())
            .then((cursor) => cursor.toArray())
    )[0] as User;
    res.json(user);
});

export default router;
