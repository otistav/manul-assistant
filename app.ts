import path from 'path';
import bot from './entities/telegram';
import PressureAction from './actions/pressure';
import { checkLastMatch } from './apps/dotamatches/index';
import { createReminder } from './apps/telegram/reminders';
import sendPotd from './apps/wiki_pic/index';

require('dotenv').config({ path: path.join(__dirname, '.env') });

(async () => {
  const FIVE_MINS = 1000 * 60 * 5;
  const HOUR = 1000 * 60 * 60;

  const stretchHands = await createReminder(process.env.TG_W as string, process.env.STRETCH_MESSAGES?.split('*') as string[]);
  setInterval(stretchHands, HOUR * 3);
  const secretReminder = await createReminder(process.env.TG_W as string, process.env.SECRET_MESSAGES?.split('*') as string[]);
  setInterval(secretReminder, HOUR * 4.5);
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

  bot.hears(/\/potd/, async (ctx) => {
    try {
      sendPotd();
    } catch (error) {
      ctx.reply('error occured');
    }
  });

  bot.launch();
})();
