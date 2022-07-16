import axios from 'axios';
// import bot from '../../../entities/telegram';
import * as cheerio from 'cheerio';
import bot from '../../../entities/telegram';

type MatchInfo = {
  hero: string;
  condition: string;
  score: string;
}

let lastMatchId = '';

const WIN = 'Вин';
const LOSE = 'Луз';
const D_WIN_COND = 'Победа';

const getMatches = (): Promise<cheerio.Cheerio<cheerio.Element>> =>
  axios.get(`https://ru.dotabuff.com/players/${process.env.DOTA_PLAYER_ID}`)
    .then(({ data }) => cheerio.load(data)('.performances-overview'));

const getMatch = (num: number) =>
  getMatches()
    .then((matches) => matches.find(`div.r-row:nth-child(${num})`));

const getMatchId = (match: cheerio.Cheerio<cheerio.AnyNode>) => match.find('time').attr('datetime');

const getMatchInfo = (match: cheerio.Cheerio<cheerio.AnyNode>): MatchInfo => ({
  hero: match.find('div.r-fluid:nth-child(1) > div.r-body > a').text(),
  condition: match.find('div.r-fluid:nth-child(2) > div.r-body > a').text(),
  score: match.find('div.r-fluid:nth-child(5) > div.r-body > span.kda-record').text(),
});

const getWinTitle = (condition) => (condition === D_WIN_COND ? WIN : LOSE);

const getMessage = (info: MatchInfo) => `Сочный ${getWinTitle(info.condition)} на ${info.hero} со счетом ${info.score}! Чекни быстрее!`;

export default async function checkLastMatch(): Promise<void> {
  const match = await getMatch(1);
  const id = getMatchId(match) as string;
  if (id !== lastMatchId) {
    if (lastMatchId !== '') {
      const info = getMatchInfo(match);
      const ids = process.env.TELEGRAM_CHAT_IDS as string;
      ids.split(',').forEach(async (tgId: string) => {
        bot.telegram.sendMessage(tgId, getMessage(info));
      });
    }
    lastMatchId = id;
  }
}
