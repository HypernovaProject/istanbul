import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (username: string) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

export default generateAccessToken;
