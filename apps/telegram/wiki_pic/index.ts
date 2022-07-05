import bot from '../../../entities/telegram';
import getPotdInfo from '../../../services/wiki_parser';

export default async function run() {
  const potd = await getPotdInfo();
  const ids = process.env.TELEGRAM_CHAT_IDS as string;
  ids.split(',').forEach(async (id: string) => {
    await bot.telegram.sendMessage(id, potd.description, { parse_mode: 'Markdown' });
    bot.telegram.sendPhoto(id, potd.link);
  });
}
