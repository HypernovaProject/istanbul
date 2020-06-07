import express, { Request, Response } from 'express';
import { db, connect, table, row, Connection } from 'rethinkdb';
import bodyParser from 'body-parser';

import prod from '../utils/prodDatabase';

const router = express.Router();

interface User {
    username: string;
    password: string;
    createdAt: string;
}

const parser = bodyParser.urlencoded({ extended: false });

router.get('/', parser, async (req: Request, res: Response) => {
    if (!req.body.user) return res.json({ message: "Missing 'user' query" });
    const user: User = (await table('posts')
        .filter(row('username').eq(req.body.user))
        .run(await prod())
        .then((cursor) => cursor.toArray())) as User;
    delete user['password'];
});

export default router;
