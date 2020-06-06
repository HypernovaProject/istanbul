import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ username: null });
});

export default router;
