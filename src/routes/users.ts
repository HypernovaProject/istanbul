import express, { Request, Response } from 'express';
import { db, connect, table, row, Connection } from 'rethinkdb';
import bodyParser from 'body-parser';

import prod from '../utils/prodDatabase';

const router = express.Router();

const parser = bodyParser.urlencoded({ extended: false });

// let connection;
// connect({ host: 'localhost', port: 28015 }, (err, conn) => {
//     if (err) throw err;
//     connection = conn;
//     db('prod')
//         .table('users')
//         .filter(row('username').eq(req.body.user))
//         .run(connection, (err, cursor) => {
//             if (err) throw err;
//             cursor.toArray((err, result) => {
//                 if (err) throw err;
//                 res.json({
//                     fullName: result[0].fullName,
//                     username: result[0].username,
//                     createdAt: result[0].createdAt,
//                 });
//             });
//         });
// });

router.get('/', parser, async (req: Request, res: Response) => {
    if (!req.body.user) return res.json({ message: "Missing 'user' query" });
    const user = await table('posts')
        .filter(row('username').eq(req.body.user))
        .run(await prod())
        .then((cursor) => cursor.toArray());
    res.json(user);
});

export default router;
