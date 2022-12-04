import bcrypt from 'bcrypt';
import { generatePassword } from '../utils/misc';
import { BadRequestError } from '../utils/errors';
import { PASS_LENGTH } from '../utils/constants';
import { UserAttributes, UserOutput } from '../db/models/User';
import * as userDal from '../db/dal/User';
const tgids = process.env.TELEGRAM_CHAT_IDS?.split(',').map(n => +n);

// TODO: type the ids
export const getById = async (id: number) => {
  const user = await userDal.getById(id);
  return user;
}

export const deleteUser = async (id) => {
  await userDal.deleteById(id);
}

export const createUser = async (username, tgid) => {
  if (!tgids?.includes(tgid)) throw new Error('tgid is not acceptable');
  const user = await userDal.getOne({ username });
  if (user) throw new BadRequestError();
  const password = generatePassword(PASS_LENGTH);
  console.log(password, 'PASSWORD')
  const hashed: string = await bcrypt.hash(password, 10);
  const newUser: UserOutput = await userDal.create({ password: hashed, tgid, username });
  return newUser;
}

export const clearModel = async () => {
  if (process.env.NODE_ENV !== 'test') throw new Error();
  await userDal.clearAll();
}