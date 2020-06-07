import express from 'express';
import api from './routes/api';

const app = express();
const port: number = 3000;

app.set('trust proxy', 1);
app.use('/api', api);
app.listen(port, (err) => {
    if (err) return console.error(err);
    return console.log('Working on port', port);
});
