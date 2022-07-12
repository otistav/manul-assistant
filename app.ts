import bot from './entities/telegram';
import PressureAction from './models/PerssureAction';
import checkLastMatch from './apps/telegram/dotamatches/index';

const FIVE_MINS = 1000 * 60 * 5;

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
