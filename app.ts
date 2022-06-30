import bot from './entities/telegram';
import PressureMessage from './models/PressureMessage';
import db from './db/db';

bot.hears(/давление:*/, async (ctx) => {
  try {
    const message = new PressureMessage(ctx.message.text);
    await message.create();
    const all = await db.getAll();
    ctx.reply(`Добавиль, проверяй ${JSON.stringify(all)}`);
  } catch (error: any) {
    console.log(error);
    ctx.reply('Шо то пошло не так');
  }
});

bot.launch();
