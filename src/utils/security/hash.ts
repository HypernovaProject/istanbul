import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

/**
 * This function hashes a given password
 *
 * @param {string} password - the password that gots to be hashed
 * @returns {string}
 * @function
 */

const securityHash = async (password: string): Promise<any> => {
    try {
        console.log(process.env.SALTING_ROUNDS);
        const hash = await bcrypt.hashSync(password, Number(process.env.SALTING_ROUNDS));
        return hash;
    } catch (e) {
        console.error(e);
    }
};

export default securityHash;
