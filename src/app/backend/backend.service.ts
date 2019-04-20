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
import { CredentialProvider } from './controller/credentialProvider';
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
    .then((passwordHash: CryptedObject) => {
        return this.userService.logon(username, passwordHash)
        .subscribe(() => {
            this.afterLogin();
            });
        });
  }

  changeUserPassword(newPassword: string): PromiseLike<Observable<any>> {
    let newCredentials = new CredentialProvider();
    let newHash: CryptedObject;
    return newCredentials.generateFromPassword(newPassword)
      .then(() => {
          return this.crypto.encryptChar(this.serverSettings.passwordGenerator, new Uint8Array(12), newCredentials)
          })
    .then((newPasswordHash: CryptedObject): PromiseLike<Array<encryptedAccount>> => {
        newHash = newPasswordHash;
        let newAccounts: Array<PromiseLike<encryptedAccount>> = [];
        for (let account of this.accounts) {
          newAccounts.push(this.reencryptAccount(account, newCredentials));
          }
        return Promise.all(newAccounts);
        })
      .then((encryptedAccounts: Array<encryptedAccount>) => {
        return this.userService.changePassword(newHash, encryptedAccounts);
      });
  }

  reencryptAccount(account: Account, newCredentials: CredentialProvider): PromiseLike<encryptedAccount> {
    return this.accountTransformer.getPassword(account)
      .then((password) => {
          return this.crypto.encryptChar(password, undefined, newCredentials);
          //todo!

          })
    .then((enpassword) => {
        account.enpassword = enpassword;
        return this.accountTransformer.encryptAccount(account, newCredentials);
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

  updateAccount(account: Account): PromiseLike<Observable<any>> {
    return this.accountTransformer.encryptAccount(account)
      .then((encAccount: encryptedAccount) => {
          return this.accountsService.updateAccount(encAccount)
          .pipe(this.parseAccounts());
          });
  }

  deleteAccount(account: Account): Observable<any> {
    return this.accountsService.deleteAccount(account.index)
      .pipe(this.parseAccounts());
  }

}
