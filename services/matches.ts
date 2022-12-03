import axios from 'axios';
// import bot from '../../../entities/telegram';
import * as cheerio from 'cheerio';
import { last } from 'cheerio/lib/api/traversing';
import { template } from 'lodash';

type MatchInfo = {
  hero: string;
  condition: string;
  score: string;
}

const WIN = process.env.WIN_MESSAGE;
const LOSE = process.env.LOSE_MESSAGE;
const D_WIN_COND = process.env.D_WIN_COND;

const FORMAT_STRING = process.env.FORMAT_STRING;
const compile = template(FORMAT_STRING);


const getMatches = (playerId: string): Promise<cheerio.Cheerio<cheerio.Element>> =>
  axios.get(`https://ru.dotabuff.com/players/${playerId}`)
    .then(({ data }) => cheerio.load(data)('.performances-overview'));

const getMatch = (playerId: string, num: number) =>
  getMatches(playerId)
    .then((matches) => matches.find(`div.r-row:nth-child(${num})`));

const getMatchId = (match: cheerio.Cheerio<cheerio.AnyNode>) => match.find('time').attr('datetime');

const getMatchInfo = (match: cheerio.Cheerio<cheerio.AnyNode>): MatchInfo => ({
  hero: match.find('div.r-fluid:nth-child(1) > div.r-body > a').text(),
  condition: match.find('div.r-fluid:nth-child(2) > div.r-body > a').text(),
  score: match.find('div.r-fluid:nth-child(5) > div.r-body > span.kda-record').text(),
});

export const getMatchInfoByIndex = (playerId: string, ind: number): Promise<MatchInfo> =>
  getMatch(playerId, ind).then((match: cheerio.Cheerio<cheerio.AnyNode>) => getMatchInfo(match));

const getWinTitle = (condition: string) => (condition === D_WIN_COND ? WIN : LOSE);

const getMessage1 = (info: MatchInfo) => `Сочный ${getWinTitle(info.condition)} на ${info.hero} со счетом ${info.score}! Чекни быстрее!`;
export const getMessage = (info: MatchInfo) => compile({ title: getWinTitle(info.condition), hero: info.hero, score: info.score });

export const createMatchChecker = (playerId) => {
  let lastMatchId = '';
  return async function (): Promise<MatchInfo | void> {
    const match = await getMatch(playerId, 1);
    const id = getMatchId(match) as string;
    console.log(lastMatchId, 'fff')
    if (id !== lastMatchId) {
      lastMatchId = id;
      console.log(lastMatchId, 'lastMatchId');
      if (lastMatchId !== '') {
        const info = getMatchInfo(match);
        return Promise.resolve(info);
      }
    }
  }
}
