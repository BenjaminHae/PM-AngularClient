import { parse } from 'papaparse';

// CsvParser class using papaparse

export class CsvParser {
  private result: any;
  public useHeaders: boolean = true;
  private headerMapping: Map<string, string> = new Map<string, string>();

  parseFile(file, preview = 0): PromiseLike<void> {
    return new Promise((resolve, reject) => {
        parse(file, {
          header: this.useHeaders,
          preview: preview,
          complete: (result) => {
            this.result = result;
            resolve();
            },
          error: (err) => {
            reject(err);
            }
          });
        });
  }

  preview(file): PromiseLike<void> {
    return this.parseFile(file, 5);
  }

  getHeaderMappings(): Map<string, string> {
    return this.headerMapping;
  }

  setHeaderMapping(internalName: string, csvName: string): void {
    this.headerMapping[internalName] = csvName;
  }

  getHeaders(): Array<string> {
      return this.result.meta.fields;
  }

  getDelimiter(): string {
      return this.result.meta.delimiter;
  }

  getRows(): Array<object> {
    return this.result.data;
  }

  outputData(): Array<object> {
    return this.result.data;
    // Todo
  }
}
