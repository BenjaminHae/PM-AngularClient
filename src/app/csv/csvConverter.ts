import { Account } from '../backend/models/account';
import { CryptoService } from '../backend/crypto.service';

export class CsvConverter {
  private data;
  public availableFields: Array<string>;
  private headerMapping: Map<string, string> = new Map<string, string>();

  constructor(private crypto: CryptoService) {}

  getHeaderMappings(): Map<string, string> {
    return this.headerMapping;
  }

  getKeyMappedTo(findValue: string): string {
    let found: string;
    this.headerMapping.forEach((value, key) => {
      if (findValue === value) {
        found = key;
      }
    });
    return found;
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

  autoHeaderMapping(headers: Array<string>): void {
    let toMap = ["name", "password"];
    if (this.availableFields) {
      toMap = toMap.concat(this.availableFields);
    }
    for (let item of headers) {
      if (toMap.includes(item)) {
        this.setHeaderMapping(item, item);
      }
      else {
        this.setHeaderMapping(item, null);
      }
    }
  }

  createAccountFromData(data: object): PromiseLike<Account> {
    let password = data[this.getKeyMappedTo("password")];
    let username = data[this.getKeyMappedTo("username")];
    return this.crypto.encryptChar(password)
      .then((enpassword) => {
        let account = new Account(null, username, enpassword);
        for (let item in this.availableFields) {
          let key = this.getKeyMappedTo(item);
          if (key) {
            account.setOther(item, data[key]);
          }
        }
        return account;
      });
  }

  createAccounts(data: Array<object>): PromiseLike<Array<Account>> {
    let promises = [];
    data.forEach((row: object) => {
      promises.push(this.createAccountFromData(row));
    });
    return Promise.all(promises);
  }
}
