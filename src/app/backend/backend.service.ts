import { Injectable } from '@angular/core';
import { Account } from './models/account';
import { encryptedAccount } from './models/encryptedAccount';
import { MaintenanceService } from './api/maintenance.service';
import { UserService } from './api/user.service';
import { AccountsService } from './api/accounts.service';
import { Observable } from 'rxjs';
import { ServerSettings } from './models/serverSettings';
import { CredentialService } from './credential.service';

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
  public serverSettings: ServerSettings = {allowRegistration: true};
  public accounts: Array<Account>;
  accountsObservable = new Observable(subscriptionCreator(this.accountsObservers));
  loginObservable = new Observable(subscriptionCreator(this.loginObservers));

  constructor(private maintenanceService: MaintenanceService, private userService: UserService, private accountsService: AccountsService, private credentials: CredentialService ) {}

  waitForBackend(): Promise<void> {
    console.log("waiting for maintenanceService");
    this.maintenanceService.retrieveInfo();
    return Promise.resolve();
  }

  logon(username: string, password: string): void {
    this.userService.logon(username, password)
      .subscribe(() => {
            this.afterLogin();
          });
  }

  afterLogin(): void {
    subscriptionExecutor(this.loginObservers, null);
    this.accountsService.getAccounts()
        .subscribe((accounts: Array<encryptedAccount>) => {
            console.log('received accounts');
            subscriptionExecutor(this.accountsObservers, accounts);
          });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.userService.register(username, password, email);
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
