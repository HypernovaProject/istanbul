import express from 'express';

const router = express.Router();

import userRoute from './users';

router.get('/', (req, res) => {
    res.send('API');
});

router.use('/users', userRoute);

export default router;
