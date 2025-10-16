import bcrypt from 'bcryptjs';
export const hash = async (plain) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
};
export const compare = (plain, hashed) => bcrypt.compare(plain, hashed);
