#! /usr/bin/env node
import { program } from 'commander';
import { getMatchInfoByIndex } from '../apps/telegram/dotamatches/index';

function greet() {
  console.log('greeting!');
}

async function getMatchInfo() {
  const info = await getMatchInfoByIndex(1);
  console.log(info);
}

program
  .command('hello')
  .description('greets our user')
  .action(greet);

program
  .command('matchInfo')
  .action(getMatchInfo);

program.parse();
