import { table, row } from 'rethinkdb';

import User from '../interfaces/User';
import prod from './prodDatabase';

/**
 * This function tries to get the user asynchronously from the database by his username
 *
 * @param {string} username - name of the user
 * @function
 */
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
