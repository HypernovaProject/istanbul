import express, { Request, Response } from 'express';

const router = express.Router();

import tokenizerRoute from './tokenizer';
import validatorRoute from './validator';
import registerRoute from './register';
import socialRoute from './social';
import closeRoute from './close';
import userRoute from './users';

router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello!',
    });
});

router.use('/users', userRoute);
router.use('/register', registerRoute);
router.use('/close', closeRoute);
router.use('/tokenizer', tokenizerRoute);
router.use('/validator', validatorRoute);
router.use('/social', socialRoute);

export default router;
