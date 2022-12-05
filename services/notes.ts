import { notDeepEqual } from 'assert';
import * as noteDal from '../db/dal/Note';
import * as userDal from '../db/dal/User';
import { NoteOutput } from '../db/models/Note';
import { BadRequestError, ExistingError } from '../utils/errors';

export const formatNotes = (notes: NoteOutput[]): string => {
  return notes.map(n => n.text).join('\n\n');
}

export const create = async (username: string, text: string, tags?: string[]) => {
  const user = await userDal.getOne({ username });
  if (!user) throw new ExistingError();
  const note = await noteDal.create({ user_id: user.id, text });
  return note;
}

export const getById = (note_id: number) => noteDal.getById(note_id);

export const del = (id: number) => noteDal.deleteById(id);

export const delAll = () => noteDal.deleteAll();

export const clearModel = async () => {
  if (process.env.NODE_ENV !== 'test') throw new Error();
  await noteDal.clearAll();
}

export const getAll = async (username: string) => {
  const user = await userDal.getOne({ username });
  if (!user) throw new BadRequestError();
  const notes = await noteDal.getAll({ user_id: user.id });
  return notes;
}