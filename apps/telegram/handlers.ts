import getHolidays from '../../services/holidays';
import { getPotdInfo } from '../../services/wiki';
import * as userService from '../../services/users';
import * as noteService from '../../services/notes';
import { BadRequestError } from '../../utils/errors';
import { MESSAGES } from '../../utils/constants';

export const onPotdRequest = async (bot, ctx) => {
  try {
    const potd = await getPotdInfo();
    const { id } = ctx.message.from;
    bot.telegram.sendMessage(id, potd.description, { parse_mode: 'Markdown' });
    bot.telegram.sendPhoto(id, potd.link);
  } catch (error) {
    console.log(error, 'error');
    ctx.reply('error occured');
  }
}

export const onHolidaysRequest = async (ctx) => {
  try {
    const holidays = await getHolidays();
    ctx.reply(holidays.toString());
  } catch (error) {
    console.log(error, 'error');
    ctx.reply('error occured');
  }
}

export const onStart = async (ctx) => {
  try {
    const user = await userService.createUser(ctx.message.from.username, ctx.message.from.id);
    console.log(ctx.message, 'ctx');
    console.log(user, 'user');
    ctx.reply(user);
  } catch (error) {
    if (error instanceof BadRequestError) {
      ctx.reply(MESSAGES.ALREADY_REGISTERED_MESSAGE);
    }
    else {
      ctx.reply(MESSAGES.ALREADY_REGISTERED_MESSAGE);
    }
  }
}

export const onNoteReceive = async (ctx) => {
  try {
    console.log(ctx.message, 'message');
    const text = ctx.message.text;
    const note = await noteService.create(ctx.message.from.username, text);
    ctx.reply('Note created successfully!');
  } catch (error) {
    console.log(error);
  }
}

export const onAllNotesRequest = async (ctx) => {
  try {
    const notes = await noteService.getAll(ctx.message.from.username);
    ctx.reply(noteService.formatNotes(notes));
  } catch (error) {
    console.log(error);
  }
}