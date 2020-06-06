import express from 'express';

const router = express.Router();
const domain = 'http://localhost:3000';

import userRoute from './users';

router.get('/', (req, res) => {
    res.json({
        message: 'Hello!',
        endpoints: {
            users: `${domain}/api/users`,
        },
    });
});

router.use('/users', userRoute);

export default router;
