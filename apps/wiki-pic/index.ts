import axios from 'axios';
import * as cheerio from 'cheerio';

type PotdInfo = {
  link: string;
  description: string;
}

export const getWikiPage = async (): Promise<string> =>
  axios.get(process.env.POTD_LINK as string).then((res) => res.data);

const getImgLink = async (page: string): Promise<string> => {
  const $ = cheerio.load(page);
  const href = $('#main-potd > .main-box-content > .center > .floatnone > a').attr('href') as string;
  const potdpage = await axios.get(`https://commons.wikimedia.org${href.replace('%D0%A4%D0%B0%D0%B9%D0%BB', 'File')}`).then((res) => res.data);
  const $_potd = cheerio.load(potdpage);
  const resolutionPage = $_potd('span.mw-filepage-other-resolutions > a:nth-last-child(2)');
  return resolutionPage.attr('href') as string;
};

export const formatImgLink = (imgLink: string): string => `https:${imgLink}`;

export const getBigResolutionLink = (link: string): string => link.replace('500px', '2560px');

export function getPotdInfo(): Promise<PotdInfo> {
  return getWikiPage().then(async (html) => {
    const link = await getImgLink(html);
    const $ = cheerio.load(html);
    const potd = $('#main-potd > .main-box-content > .center > .floatnone > a > img').attr('src') as string;
    if (!potd) throw new Error('No potd found');
    const description = $('#main-potd > .main-box-imageCaption > p').text();
    return {
      link,
      description,
    };
  });
}
