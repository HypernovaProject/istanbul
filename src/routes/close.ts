import express from 'express';
import bodyParser from 'body-parser';
import { db, connect, table, row } from 'rethinkdb';

const router = express.Router();
const parser = bodyParser.urlencoded({ extended: false });

router.post('/', parser, (req, res) => {
    let connection = null;
    if (!req.body.username || !req.body.password) return res.json({ message: "No credentials provided." })
    connect({ host: 'localhost', port: 28015 }, (err, conn) => {
        if (err) throw err;
        connection = conn;
        db('prod').table('users').filter({ username: req.body.username, password: req.body.password }).delete().run(connection, (err, result) => {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
            res.json({
                sent_data: {
                    username: req.body.username
                }
            });
        })
    })
})

export default router;