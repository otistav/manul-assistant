import { Telegraf } from 'telegraf';
import path from 'path';
import { onPotdRequest, onHolidaysRequest } from './router';

require('dotenv').config({ path: path.join(__dirname, '../.env') });

function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);
  return bot;
}

const bot = createBot(process.env.TELEGRAM_TOKEN as string);

bot.hears(/\/potd/, (ctx) => onPotdRequest(bot, ctx));
bot.hears(/\/holidays/, onHolidaysRequest);

export default bot;
