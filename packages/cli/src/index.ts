#!/usr/bin/env node
import { Command } from 'commander'
import { add } from './commands/add.js'
import { init } from './commands/init.js'
import { list } from './commands/list.js'

const program = new Command()
  .name('untitled-ds')
  .description('CLI for Untitled Design System - add components to your project')
  .version('0.1.0')

program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-p, --path <path>', 'Destination path for components', 'src/components')
  .option('-o, --overwrite', 'Overwrite existing files')
  .action(add)

program
  .command('init')
  .description('Initialize your project with Untitled Design System')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(init)

program
  .command('list')
  .description('List available components')
  .action(list)

program.parse()
