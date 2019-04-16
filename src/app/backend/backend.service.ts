import { Injectable } from '@angular/core';
import { Account } from './models/account';
import { CryptedObject } from './models/cryptedObject';
import { encryptedAccount } from './models/encryptedAccount';
import { MaintenanceService } from './api/maintenance.service';
import { UserService } from './api/user.service';
import { AccountsService } from './api/accounts.service';
import { Observable, from, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerSettings } from './models/serverSettings';
import { AccountTransformerService } from './controller/account-transformer.service';
import { CredentialService } from './credential.service';
import { CryptoService } from './crypto.service';

function subscriptionCreator(list): any {
    return (observer) => {
      list.push(observer);
      return {
        unsubscribe() {
          list.splice(list.indexOf(observer), 1);
        }
      }
    };
}
function subscriptionExecutor(list, params) {
  list.forEach(obs => obs.next(params));
}
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private accountsObservers = [];
  private loginObservers = [];
  public serverSettings: ServerSettings = {allowRegistration: true, passwordGenerator: "aaaaab"};
  public accounts: Array<Account>;
  accountsObservable = new Observable(subscriptionCreator(this.accountsObservers));
  loginObservable = new Observable(subscriptionCreator(this.loginObservers));

  constructor(private maintenanceService: MaintenanceService, private userService: UserService, private accountsService: AccountsService, private credentials: CredentialService, private accountTransformer: AccountTransformerService, private crypto: CryptoService ) {}

  waitForBackend(): Promise<void> {
    console.log("waiting for maintenanceService");
    this.maintenanceService.retrieveInfo();
    return Promise.resolve();
  }

  logon(username: string, password: string): void {
    this.credentials.generateFromPassword(password)
      .then((key) => {
          return this.crypto.encryptChar(this.serverSettings.passwordGenerator, new Uint8Array(12))
          })
    .then((ciphertext: CryptedObject) => {
        return this.userService.logon(username, ciphertext.toBase64JSON())
        .subscribe(() => {
            this.afterLogin();
            });
        });
  }

  afterLogin(): void {
    subscriptionExecutor(this.loginObservers, null);
    this.accountsService.getAccounts()
      .pipe(this.parseAccounts())
      .subscribe();
  }

  private parseAccounts(): OperatorFunction<Array<encryptedAccount>, void> {
    return map((accounts: Array<encryptedAccount>): void => {
        console.log("received accounts");
        let promises: Array<PromiseLike<Account>> = [];
        accounts.forEach((encaccount: encryptedAccount) => {
            let promise = this.accountTransformer.decryptAccount(encaccount);
            promises.push(promise);
            });
        Promise.all(promises).then((accounts: Array<Account>) => {
            this.accounts = accounts;
            subscriptionExecutor(this.accountsObservers, accounts);
            });
        return ;
        });
  }

  register(username: string, password: string, email: string): PromiseLike<Observable<any>> {
    return this.credentials.generateFromPassword(password)
      .then((key) => {
          return this.crypto.encryptChar(this.serverSettings.passwordGenerator, new Uint8Array(12))
          })
    .then((ciphertext: CryptedObject) => {
        return this.userService.register(username, ciphertext, email)
        });
  }

  addAccount(account: Account): PromiseLike<Observable<any>> {
    return this.accountTransformer.encryptAccount(account)
      .then((encAccount: encryptedAccount) => {
          return this.accountsService.addAccount(encAccount)
          .pipe(this.parseAccounts());
          });
  }

/*
  private backend: AccountBackend = null;
  public requestGoing: boolean = false;

  constructor() { }

  getDomain(): string {
    return "https://www.benjaminh.de/pwtest/";
  }

  waitForBackend(): Promise<AccountBackend> {
    if (this.backend) {
      return Promise.resolve(this.backend);
    }
    return new Promise((resolve, reject) => {
      this.afterPreparation.push(resolve);
      this.failedPreparation.push(reject);
    });
  }

  prepareBackend(user: string, password: string): Promise<AccountBackend> {
    if (this.backend) {
      return Promise.resolve(this.backend);
    }
    if (this.requestGoing) {
      return new Promise((resolve, reject) => {
        this.afterPreparation.push(resolve);
        this.failedPreparation.push(reject);
      });
    }
    this.requestGoing = true;
    var loginBackend: LogonBackend = new LogonBackend();
    loginBackend.domain = this.getDomain();
    return loginBackend.loadInfo()
      .then(() => {
        return loginBackend.doLogin(user, password)
      })
      .then((value) => {
        this.backend = new AccountBackend();
        this.backend.domain = this.getDomain();
        return this.backend.loadAccounts();
      })
      .then(() => {
        this.requestGoing = false;
        while (this.afterPreparation.length > 0) {
          this.afterPreparation.pop()(this.backend);
        }
        return this.backend;
      })
      .catch((error) => {
        while (this.failedPreparation.length > 0) {
          this.failedPreparation.pop()(error);
        }
        throw error;
      });
  }

  getAccounts(): Promise<Account[]> {
    return this.waitForBackend().then((backend: AccountBackend) => {
      return backend.accounts;
    });
  }
*/
}
