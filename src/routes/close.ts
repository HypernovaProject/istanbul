import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { table, row } from 'rethinkdb';

import auth from '../middleware/authToken';
import prod from '../utils/prodDatabase';
import User from '../interfaces/User';

import checkCredentials from '../utils/checkCredentials';

const router = express.Router();
const parser = bodyParser.json();

router.post('/', auth, parser, async (req: Request, res: Response) => {
    if (!req.body || !req.body.username || !req.body.password) return res.json({ message: 'No credentials provided.' });
    const user: Promise<User> = checkCredentials(req.body.username);
    if ((await user) == undefined) return res.json({ message: 'User not found.' });
    if ((await (await user).password) !== req.body.password) return res.json({ message: 'Wrong password. Try again' });
    await table('users')
        .filter(row('username').eq(req.body.username))
        .delete()
        .run(await prod());
    res.json({ message: 'Removed account.' });
});

export default router;
