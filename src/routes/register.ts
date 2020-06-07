import express from 'express';
import bodyParser from 'body-parser';
import { db, connect, table, row } from 'rethinkdb';
import moment from 'moment';

const router = express.Router();
const parser = bodyParser.urlencoded({ extended: false });

router.post('/', parser, (req, res) => {
    let connection = null;
    if (!req.body.username || !req.body.password || !req.body.fullName) return res.json({ message: "No credentials provided." })
    let existing: boolean = false;
    connect({ host: 'localhost', port: 28015 }, (err, conn) => {
        if (err) throw err;
        connection = conn;
        db('prod').table('users').filter(row('username').eq(req.body.username)).run(connection, (err, cursor) => {
            if (err) throw err;
            cursor.toArray((err, result) => { 
                if (err) throw err;
                if (result && result.length > 0) {
                    existing = false;
                } else if (result[0].username == req.body.username) {
                    existing = true;
                }
            });
        })
        if (!existing) {
            db('prod').table('users').insert([
                {
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: req.body.password,
                    createdAt: moment().format('LLLL')
                }
            ]).run(conn, (err, result) => {
                if (err) throw err;
                console.log('Checking');
                if (!existing) {
                    res.json({
                        sent_data: {
                            username: req.body.username, password: req.body.passhash
                        }
                 });
                } else {
                    res.json({ message: "This user exists already!"})
                }
            })
        }
    })
})

export default router;