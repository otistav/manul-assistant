import path from 'path';
import bot from './entities/telegram';
import PressureAction from './actions/pressure';
import { checkLastMatch } from './apps/telegram/dotamatches/index';
import { createReminder } from './apps/telegram/reminders';

require('dotenv').config({ path: path.join(__dirname, '.env') });

(async () => {
  const FIVE_MINS = 1000 * 60 * 5;
  const HOUR = 1000 * 60 * 60;

  const stretchHands = await createReminder(process.env.TG_H as string, process.env.STRETCH_MESSAGES?.split('*') as string[]);
  // setInterval(stretchHands, HOUR * 3);
  // stretchHands();
  const secretReminder = await createReminder(process.env.TG_H as string, process.env.SECRET_MESSAGES?.split('*') as string[]);
  // setInterval(secretReminder, HOUR * 4.5);
  // secretReminder();
  // setInterval(checkLastMatch, FIVE_MINS);
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
})();
