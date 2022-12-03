import bot from '.';

export const sendMessageAll = (ids: string[], message: string) => {
  ids.forEach(async (tgId: string) => {
    bot.telegram.sendMessage(tgId, message);
  });
}