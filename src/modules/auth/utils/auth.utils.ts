import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const compareHash = async (password: string, passwordHash: string) => {
  return bcrypt.compare(password, passwordHash);
};
