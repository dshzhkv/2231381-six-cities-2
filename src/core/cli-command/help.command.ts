import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
          ${chalk.green('npm run ts ./src/main.cli.ts --<command> [--arguments]')}
        Команды: ${chalk.blue(`
          --version:                   # выводит номер версии
          --help:                      # печатает этот текст
          --import <path>:             # импортирует данные из TSV`)}`
    );
  }
}
