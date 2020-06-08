import { connect, Connection } from 'rethinkdb';
import dotenv from 'dotenv';

dotenv.config();

const connector = async (): Promise<Connection> => {
    return await connect({ host: process.env.DB_HOST, port: 28015, db: process.env.DB_DATA });
};

export default connector;
