import { connect, Connection } from 'rethinkdb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Function that connects to RethinkDB asynchronously using the official 'rethindb' driver
 *
 * @function @async
 */
const connector = async (): Promise<Connection> => {
    return await connect({ host: process.env.DB_HOST, port: 28015, db: process.env.DB_PROD });
};

export default connector;
