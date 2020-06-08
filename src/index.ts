import express, { Application } from 'express';
import dotenv from 'dotenv';
import api from './routes/api';

dotenv.config();

const app: Application = express();
const port = process.env.BACKEND_PORT || 3000;

app.use('/api', api);
app.listen(port, () => {
    return console.log('Working on port', port);
});
