import axios from 'axios';
import * as cheerio from 'cheerio';

function getWikiPage(): Promise<string> {
  return axios.get('https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0').then((res) => res.data);
}

function formatImgLink(imgLink: string): string {
  return `https:${imgLink}`;
}

export default function getPotdInfo(): Promise<any> {
  return getWikiPage().then((html) => {
    const $ = cheerio.load(html);
    const potd = $('#main-potd > .main-box-content > .center > .floatnone > a > img').attr('src') as string;
    if (!potd) throw new Error('No potd found');
    const description = $('#main-potd > .main-box-imageCaption > p').text();
    return {
      link: formatImgLink(potd),
      description,
    };
  });
}
