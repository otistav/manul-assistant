import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '.env') });
import * as cron from 'node-cron';
import bot from './apps/telegram';
import dbInit from './db/init';
import User from './db/models/User';
import { notifyMatchTg } from './services/matches';
import Note from './db/models/Note';

const HOUR = 1000 * 60 * 60;


cron.schedule('* * * * *', () => {
  console.log('cron works well');
});

(async () => {
  await dbInit();
  bot.launch();
  setInterval(notifyMatchTg, HOUR / 2)
})();
