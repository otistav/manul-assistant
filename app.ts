import path from 'path';
import * as cron from 'node-cron';
import bot from './entities/telegram';
import PressureAction from './actions/pressure';
import { checkLastMatch } from './apps/dotamatches/index';
import { createReminder } from './apps/telegram/reminders';
import getPotdInfo from './apps/wiki-pic';

require('dotenv').config({ path: path.join(__dirname, '.env') });

cron.schedule('* * * * *', () => {
  console.log('cron works well');
});

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
      const potd = await getPotdInfo();
      const { id } = ctx.message.from;
      bot.telegram.sendMessage(id, potd.description, { parse_mode: 'Markdown' });
      bot.telegram.sendPhoto(id, potd.link);
    } catch (error) {
      ctx.reply('error occured');
    }
  });

  bot.launch();
})();
