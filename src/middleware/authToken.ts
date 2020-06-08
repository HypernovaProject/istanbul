import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * This function acts as a middleware which implies authentciation
 *
 * @param {Request} req - server request
 * @param {Response} res - server response
 * @param {NextFunction} next - next function
 * @function
 */
function authenticateToken(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.error(err);
        if (err) return res.sendStatus(403);
        next();
    });
}

export default authenticateToken;
