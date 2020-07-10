import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { row, table } from 'rethinkdb';
import moment from 'moment';

import securityHash from '../utils/security/hash';
import prod from '../utils/prodDatabase';
import User from '../interfaces/User';

const router = express.Router();
const parser = bodyParser.json();

router.post('/', parser, async (req: Request, res: Response) => {
    if (!req.body || !req.body.username || !req.body.password || !req.body.fullName)
        return res.status(400).json({ message: 'No credentials provided.' });

    const user: User = (
        await table('users')
            .filter(row('username').eq(req.body.username))
            .run(await prod())
            .then((cursor) => cursor.toArray())
    )[0] as User;

    if (user) {
        res.json({ message: 'User already exists.' });
    } else {
        const hash = await securityHash(req.body.password);
        table('users')
            .insert([
                {
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: hash,
                    createdAt: moment().format('LLLL'),
                },
            ])
            .run(await prod());
        res.status(200).json({ message: 'Registered. Thanks for playing!' });
    }
});

export default router;
