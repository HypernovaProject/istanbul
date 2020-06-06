import express from 'express';

const app = express();
const port = 3000;

import api from './routes/api';

app.use('/api', api);

app.listen(port, (err) => {
    if (err) return console.error(err);
    return console.log('Working on port', port);
});
