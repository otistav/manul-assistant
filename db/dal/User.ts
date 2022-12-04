import { ExistingError } from '../../utils/errors';
import User, { UserOutput, UserInput } from '../models/User';

export const create = (input: UserInput): Promise<UserOutput> => User.create(input);

export const update = async (userId: number, fields: Partial<UserInput>): Promise<UserOutput> => {
  const user = await User.findByPk(userId);
  if (!user) throw new ExistingError();
  return user.update(fields);
}

export const deleteById = (id: number) => User.destroy({ where: { id } });

export const getById = (id: number): Promise<UserOutput | null> => User.findByPk(id);

export const getOne = (query: Partial<UserInput>): Promise<UserOutput | null> => User.findOne({ where: query });

export const clearAll = () => User.sync({ force: true });
