import axios from 'axios';
import * as cheerio from 'cheerio';

type PotdInfo = {
  link: string;
  description: string;
}

export const getWikiPage = (): Promise<string> => axios.get(process.env.POTD_LINK as string).then((res) => res.data);

export const formatImgLink = (imgLink: string): string => `https:${imgLink}`;

export const getBigResolutionLink = (link: string): string => link.replace('500px', '2560px');

export function getPotdInfo(): Promise<PotdInfo> {
  return getWikiPage().then((html) => {
    const $ = cheerio.load(html);
    const potd = $('#main-potd > .main-box-content > .center > .floatnone > a > img').attr('src') as string;
    if (!potd) throw new Error('No potd found');
    const description = $('#main-potd > .main-box-imageCaption > p').text();
    return {
      link: getBigResolutionLink(formatImgLink(potd)),
      description,
    };
  });
}
