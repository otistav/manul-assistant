import bot from './entities/telegram';
import PressureMessage from './models/PressureMessage';

bot.hears(/давление:*/, async (ctx) => {
  try {
    const message = new PressureMessage(ctx.message.text);
    await message.appendAsRow();
    ctx.reply('Добавиль, проверяй');
  } catch (error: any) {
    console.log(error.response.data.error);
    ctx.reply('Шо то пошло не так');
  }
});

bot.launch();
