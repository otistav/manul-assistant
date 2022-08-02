#! /usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import os from 'os';
import { getMatchInfoByIndex } from '../apps/dotamatches/index';

const getEnvVars = (filecontent: string): any =>
  filecontent.split('\n').filter((m) => !!m).reduce((prev, curr) => ({ ...prev, [curr.split('=')[0]]: curr.split('=')[1] }), {});

const file = fs.readFileSync(`${os.homedir()}/.manulconf`);
const envVars = getEnvVars(file.toString());
function greet() {
  console.log('greeting!');
}

async function getMatchInfo() {
  try {
    console.log(envVars);
    if (!envVars.DOTA_PLAYER_ID) throw new Error('no dota player specified');
    const info = await getMatchInfoByIndex(envVars.DOTA_PLAYER_ID, 1);
    console.log(info);
  } catch (error: any) {
    console.log(error, 'e');
  }
}

program
  .command('hello')
  .description('greets our user')
  .action(greet);

program
  .command('matchInfo')
  .action(getMatchInfo);

program.parse();
