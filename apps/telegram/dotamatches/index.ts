import axios from 'axios';
// import bot from '../../../entities/telegram';
import * as cheerio from 'cheerio';
import bot from '../../../entities/telegram';

let lastMatchId = '';

async function getLastMatch() {
  const resp = await axios.get(`https://ru.dotabuff.com/players/${process.env.DOTA_PLAYER_ID}`);
  const $ = cheerio.load(resp.data);
  const result = $('.performances-overview');
  return result.find('div.r-row:nth-child(1)');
}

function getMatchId(match: cheerio.Cheerio<cheerio.AnyNode>) {
  return match.find('time').attr('datetime');
}
function getMatchInfo(match: cheerio.Cheerio<cheerio.AnyNode>) {
  const hero = match.find('div.r-fluid:nth-child(1) > div.r-body > a').text();
  const condition = match.find('div.r-fluid:nth-child(2) > div.r-body > a').text();
  const winTitle = condition === 'Победа' ? 'Вин' : 'Проёб';
  const score = match.find('div.r-fluid:nth-child(5) > div.r-body > span.kda-record').text();

  return {
    hero,
    condition,
    winTitle,
    score,
  };
  // return match.
}

export default async function checkLastMatch(): Promise<void> {
  const match = await getLastMatch();
  console.log(getMatchInfo(match), 'info');
  const id = getMatchId(match) as string;
  if (id !== lastMatchId) {
    if (lastMatchId !== '') {
      const info = getMatchInfo(match);
      const ids = process.env.TELEGRAM_CHAT_IDS as string;
      ids.split(',').forEach(async (tgId: string) => {
        bot.telegram.sendMessage(tgId, `Сочный ${info.winTitle} на ${info.hero} со счетом ${info.score}! Чекни быстрее!`);
      });
    }
    lastMatchId = id;
  }
}
