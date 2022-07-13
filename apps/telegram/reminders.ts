import bot from '../../entities/telegram';

// eslint-disable-next-line import/prefer-default-export
export async function stretchHands() {
  const notProperTime = (new Date().getHours() > 0 && new Date().getHours() < 8)
                      || new Date().getHours() > 22;
  if (notProperTime) {
    return;
  }
  const messages = process.env.STRETCH_MESSAGES?.split('*') as string[];
  bot.telegram.sendMessage(
    process.env.TG_W as string,
    messages[Math.floor(Math.random() * messages.length)] as string,
  );
}
