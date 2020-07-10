import bcrypt from 'bcrypt';

const securityCompare = async (pwd: string, hash: string) => {
    return await bcrypt.compareSync(pwd, hash);
};

export default securityCompare;
