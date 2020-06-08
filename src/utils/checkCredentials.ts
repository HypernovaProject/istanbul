import { table, row } from 'rethinkdb';

import User from '../interfaces/User';
import prod from './prodDatabase';

const checkCredentials = async (username: string): Promise<any> => {
    try {
        const user: User = (
            await table('users')
                .filter(row('username').eq(username))
                .run(await prod())
                .then((cursor) => cursor.toArray())
        )[0] as User;
        return await user;
    } catch (err) {
        console.log('error', err);
    }
    return await undefined;
};

export default checkCredentials;
