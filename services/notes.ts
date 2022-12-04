import * as noteDal from '../db/dal/Note';

export const create = async (user_id, text, tags) => {
  const note = await noteDal.create({ user_id, text });
  return note;
}

export const getById = (note_id: number) => noteDal.getById(note_id);

export const del = (id: number) => noteDal.deleteById(id);

export const delAll = () => noteDal.deleteAll();

export const clearModel = async () => {
  if (process.env.NODE_ENV !== 'test') throw new Error();
  await noteDal.clearAll();
}