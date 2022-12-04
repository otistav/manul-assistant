import { Telegraf } from 'telegraf';
import { onPotdRequest, onHolidaysRequest, onStart, onNoteReceive, onAllNotesRequest } from './handlers';


function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);
  return bot;
}

const bot = createBot(process.env.TELEGRAM_TOKEN as string);

bot.hears(/\/potd/, (ctx) => onPotdRequest(bot, ctx));
bot.hears(/\/holidays/, onHolidaysRequest);
bot.hears(/\/register/, onStart);
bot.hears(/N: */, onNoteReceive);
bot.hears(/\/allnotes/, onAllNotesRequest);


export default bot;
