import { parse } from 'papaparse';
import { Account } from '../backend/models/account';

// CsvParser class using papaparse

export class CsvParser {
  private result: any;
  private headerMapping: Map<string, string> = new Map<string, string>();
  public availableFields: Array<string>;

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
    return this.parseFile(file, 5)
      .then(() => {
            if (this.headerMapping.size < 1) {
              this.autoHeaderMapping();
            }
          });
  }

  autoHeaderMapping(): void {
    let toMap = ["name", "password"];
    if (this.availableFields) {
      toMap = toMap.concat(this.availableFields);
    }
    for (let item of this.getHeaders()) {
      if (toMap.includes(item)) {
        this.setHeaderMapping(item, item);
      }
      else {
        this.setHeaderMapping(item, null);
      }
    }
  }

  getHeaderMappings(): Map<string, string> {
    return this.headerMapping;
  }

  setHeaderMapping(csvName: string, internalName: string): boolean {
    let duplicates = false;
    this.headerMapping.forEach((value, key) => {
        if (value) {
          if (value === internalName) {
            duplicates = true;
          }
        }
      });
    if (duplicates) {
        console.log("duplicate: "+ csvName + " -> " + internalName);
        return false;
    }
    this.headerMapping.set(csvName, internalName);
    return true;
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

  private convertDataToAccount(data): Account {
//Todo
    return new Account(null,null,null);
  }

  outputData(): Array<object> {
    return this.result.data;
    // Todo
  }
}
