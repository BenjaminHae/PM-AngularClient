import { Injectable } from '@angular/core';
import { AccountBackend,LogonBackend  } from './backend.js';
import { Account } from './account.js';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backend: AccountBackend = null;
  public requestGoing: boolean = false;
  private afterPreparation = [];
  private failedPreparation = [];

  constructor() { }

  getDomain(): string {
    return "https://www.benjaminh.de/pwtest/";
  }
  getUser(): string {
    return "tester";
  }
  getPassword(): string {
    return "testtest2";
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

  prepareBackend(): Promise<AccountBackend> {
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
        return loginBackend.doLogin(this.getUser(), this.getPassword())
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
    var backendReady: Promise<AccountBackend>;
    if (!this.backend) {
      backendReady = this.prepareBackend();
    }
    else {
      backendReady = Promise.resolve(this.backend);
    }
    return backendReady.then(function(backend: AccountBackend) {
      return backend.accounts;
    });
  }
}
