import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = String(process.env.TOKEN_SECRET);

const generateAccessToken = (username: string) => {
    return jwt.sign({ userId: username }, secret, { expiresIn: 60 * 60 });
};

export default generateAccessToken;
