import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticateToken(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
        console.error(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export default authenticateToken;
