import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import auth from '../middleware/authToken';
import generateAccessToken from '../utils/generateToken';

const router = express.Router();
const parser = bodyParser.json();

router.get('/', parser, async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) return res.json({ message: "Missing 'user' query" });
    const token = generateAccessToken(req.body.username);
    res.json(token);
});

export default router;
