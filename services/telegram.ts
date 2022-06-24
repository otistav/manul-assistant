import { Telegraf } from 'telegraf';

export default function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);
  return bot;
}
