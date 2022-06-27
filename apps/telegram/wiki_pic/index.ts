import bot from '../../../entities/telegram';
import getPotdInfo from '../../../services/wiki_parser';

function getBigResolutionLink(link: string): string {
  return link.replace('500px', '2560px');
}

function formatMessage(potd: any): string {
  return `${potd.description}\n`;
}

export default async function run() {
  const potd = await getPotdInfo();
  const ids = process.env.TELEGRAM_CHAT_IDS as string;
  ids.split(',').forEach(async (id: string) => {
    await bot.telegram.sendMessage(id, formatMessage(potd), { parse_mode: 'Markdown' });
    bot.telegram.sendPhoto(id, getBigResolutionLink(potd.link));
  });
}
