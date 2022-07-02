import bot from './entities/telegram';
import PressureMessage from './models/PressureMessage';
import db from './db/db';

bot.hears(/давление:*/, async (ctx) => {
  try {
    const message = new PressureMessage(ctx.message.text);
    await message.create();
    ctx.reply('Добавиль, проверяй');
  } catch (error: any) {
    console.log(error);
    ctx.reply('Шо то пошло не так');
  }
});

bot.launch();
