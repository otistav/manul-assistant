#! /usr/bin/env node
import { program } from 'commander';

function greet() {
  console.log('greeting!');
}

program
  .command('hello')
  .action(greet);
