import createBot from '../../services/telegram';
import getPotdInfo from '../../services/wiki_parser';

require('dotenv').config();

const bot = createBot(process.env.TELEGRAM_TOKEN as string);

function formatMessage(potd: any): string {
  return `*${potd.description}*\n`;
}

export default async function run() {
  const potd = await getPotdInfo();
  await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID as string, formatMessage(potd), { parse_mode: 'Markdown' });
  bot.telegram.sendPhoto(process.env.TELEGRAM_CHAT_ID as string, potd.link);
}
