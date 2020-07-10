import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import generateAccessToken from '../utils/generateToken';
import checkCredentials from '../utils/checkCredentials';
import securityHash from '../utils/security/compare';
import User from '../interfaces/User';
import securityCompare from '../utils/security/compare';

const router = express.Router();
const parser = bodyParser.json();

router.get('/', parser, async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) return res.json({ message: "Missing 'username' / 'password' query" });

    /* Check whether a user with the same data exists */
    const user: Promise<User> = checkCredentials(req.body.username);

    /* Check if user exists */
    if ((await user) == undefined) {
        return res.status(400).json({ message: "You didn't provide correct user info or this user does not exist." });
    }

    const isValidated = await securityCompare(req.body.password, (await user).password);
    if (isValidated) {
        /* If everything is good then pass the token */
        const token = generateAccessToken(req.body.username);
        res.json(token);
    } else {
        return res.status(400).json({ message: 'Wrong password. Try again with the correct one.' });
    }
});

export default router;
