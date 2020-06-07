import express, { Request, Response } from 'express';
import { db, connect, table, row, Connection } from 'rethinkdb';
import bodyParser from 'body-parser';

import prod from '../utils/prodDatabase';
import User from '../interfaces/User';

const router = express.Router();
const parser = bodyParser.urlencoded({ extended: false });

router.get('/', parser, async (req: Request, res: Response) => {
    if (!req.body.user) return res.json({ message: "Missing 'user' query" });
    const user: User = (
        await table('users')
            .filter(row('username').eq(req.body.user))
            .run(await prod())
            .then((cursor) => cursor.toArray())
    )[0] as User;
    console.log(delete user.password);
    console.log(typeof user.password);
    console.log(user);
    res.json(user);
});

export default router;
