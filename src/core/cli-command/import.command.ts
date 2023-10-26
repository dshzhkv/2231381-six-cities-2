import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createOffer} from '../helpers/offers.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', ImportCommand.onLine);
    fileReader.on('end', ImportCommand.onComplete);

    try {
      await fileReader.read();
    } catch(error) {
      console.log(`Can't read the file: ${(error as Error)?.message || ''}`);
    }
  }

  private static onLine(line: string) {
    console.log(createOffer(line));
  }

  private static onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }
}
