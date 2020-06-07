import express, { Request, Response } from 'express';

const router = express.Router();
const domain = 'http://localhost:3000';

import userRoute from './users';
import registerRoute from './register';
import closeRoute from './close';

router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello!',
        endpoints: {
            users: `${domain}/api/users`,
        },
    });
});

router.use('/users', userRoute);
router.use('/register', registerRoute);
router.use('/close', closeRoute);

export default router;
