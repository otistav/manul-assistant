import getHolidays from '../../services/holidays';
import { getPotdInfo } from '../../services/wiki';

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