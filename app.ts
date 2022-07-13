import path from 'path';
import bot from './entities/telegram';
import PressureAction from './models/PerssureAction';
import checkLastMatch from './apps/telegram/dotamatches/index';
import { stretchHands } from './apps/telegram/reminders';

require('dotenv').config({ path: path.join(__dirname, '.env') });

const FIVE_MINS = 1000 * 60 * 5;
const THREE_HOURS = 1000 * 60 * 60 * 3;

setInterval(stretchHands, THREE_HOURS);
stretchHands();

setInterval(checkLastMatch, FIVE_MINS);
checkLastMatch();

bot.hears(/давление:*/, async (ctx) => {
  try {
    const message = new PressureAction(ctx.message.text);
    await message.create();
    ctx.reply('Добавиль, проверяй');
  } catch (error: any) {
    console.log(error);
    ctx.reply('Шо то пошло не так');
  }
});

bot.launch();
