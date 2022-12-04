import { ExistingError } from '../../utils/errors';
import Note, { NoteOutput, NoteInput } from '../models/Note';

export const create = (input: NoteInput): Promise<NoteOutput> => Note.create(input);

export const update = async (userId: number, fields: Partial<NoteInput>): Promise<NoteOutput> => {
  const user = await Note.findByPk(userId);
  if (!user) throw new ExistingError();
  return user.update(fields);
}

export const deleteById = (id: number): Promise<any> => Note.destroy({ where: { id } })
export const deleteAll = () => Note.destroy({ where: {} });
export const getById = (id: number): Promise<NoteOutput | null> => Note.findByPk(id);

export const getOne = (query: Partial<NoteInput>): Promise<NoteOutput | null> => Note.findOne({ where: query });

export const clearAll = async () => {
  if (process.env.NODE_ENV !== 'test') throw new Error();
  await Note.sync({ force: true });
}