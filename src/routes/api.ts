import express, { Request, Response } from 'express';

const router = express.Router();

/* Import API routes */
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

/* Use API routes */
router.use('/tokenizer', tokenizerRoute);
router.use('/validator', validatorRoute);
router.use('/register', registerRoute);
router.use('/social', socialRoute);
router.use('/users', userRoute);
router.use('/close', closeRoute);

export default router;
