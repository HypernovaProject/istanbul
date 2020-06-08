import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import generateAccessToken from '../utils/generateToken';
import checkCredentials from '../utils/checkCredentials';
import User from '../interfaces/User';

const router = express.Router();
const parser = bodyParser.json();

router.get('/', parser, async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) return res.json({ message: "Missing 'username' / 'password' query" });

    /* Check whether a user with the same data exists */
    const user: Promise<User> = checkCredentials(req.body.username);

    /* Check if user exists */
    if ((await user) == undefined) {
        return res.status(400).json({ message: "You didn't provide correct user info or this user does not exist." });
    } else if ((await (await user).password) !== req.body.password) {
        return res.status(400).json({ message: 'Wrong password. Try again with the correct one.' });
    }

    /* If everything is good then pass the token */
    const token = generateAccessToken(req.body.username);
    res.json(token);
});

export default router;
