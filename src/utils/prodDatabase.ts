import { db, connect, table, row, Connection } from 'rethinkdb';

let connection: Connection;
connect({ host: 'localhost', port: 28015, db: 'prod' }).then((conn: Connection) => (connection = conn));

export default connection;
