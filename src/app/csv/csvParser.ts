import { parse } from 'papaparse';

// CsvParser class using papaparse

export class CsvParser {
  private result: any;

  parseFile(file, preview = 0): PromiseLike<void> {
    return new Promise((resolve, reject) => {
        parse(file, {
          header: true,
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

  getHeaders(): Array<string> {
      return this.result.meta.fields;
  }

  getDelimiter(): string {
      return this.result.meta.delimiter;
  }

  getRows(): Array<object> {
    if (this.result.data) {
      return this.result.data;
    }
    return [];
  }
}
