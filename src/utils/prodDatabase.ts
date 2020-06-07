import { db, connect, table, row, Connection } from 'rethinkdb';

const connector = async (): Promise<Connection> => {
    return await connect({ host: 'localhost', port: 28015, db: 'prod' });
};

export default connector;
