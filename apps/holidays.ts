import axios from 'axios';
import * as cheerio from 'cheerio';

const formatHolidays = async (holidays: string[]) => holidays.map((elem) => `${elem.split('  ').filter((e) => !!e)[0]}\n`).join('');

const getHolidays = async () => {
  const { data } = await axios.get('https://my-calend.ru/holidays');
  const $ = cheerio.load(data);
  const holidaysElem = $('.holidays-items > li');
  const holidays: string[] = [];
  holidaysElem.each((i, elem) => {
    holidays.push($(elem).text());
  });

  return formatHolidays(holidays);
};

export default getHolidays;
