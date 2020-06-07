import express, { Application } from 'express';
import cors from 'cors';
import api from './routes/api';

const app: Application = express();
const port = 3000;

app.use(cors());

app.use('/api', api);
app.listen(port, (err) => {
    if (err) return console.error(err);
    return console.log('Working on port', port);
});
