import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from '../middleware/authToken';

const router = express.Router();
const parser = bodyParser.json();

router.get('/', parser, auth, async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Social Endpoints',
    });
});

export default router;
