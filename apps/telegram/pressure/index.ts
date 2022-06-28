import bot from '../../../entities/telegram';

bot.hears(/давление:*/, (ctx) => {
  ctx.reply('ааа, давление меряешь, мерзавец? Молодец!');
});

bot.launch();
