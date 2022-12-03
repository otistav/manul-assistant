import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '.env') });
import * as cron from 'node-cron';
import bot from './apps/telegram';
import { createMatchChecker, getMessage } from './services/matches';
import { sendMessageAll } from './apps/telegram/utils';

cron.schedule('* * * * *', () => {
  console.log('cron works well');
});

(async () => {
  const HOUR = 1000 * 60 * 60;
  const checkLastMatch = createMatchChecker(process.env.DOTA_PLAYER_ID);
  const notifyMatchTg = async () => {
    const data = await checkLastMatch();
    if (!data) return;
    const message = getMessage(data);
    const ids = process.env.TELEGRAM_CHAT_IDS as string;
    sendMessageAll(ids.split(','), message);
  }
  bot.launch();
  setInterval(notifyMatchTg, HOUR / 2)
})();
