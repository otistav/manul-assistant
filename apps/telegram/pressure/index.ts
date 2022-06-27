import bot from '../../../entities/telegram';

bot.on('message', (ctx) => {
  ctx.reply('how can I help you?');
});

bot.launch();
