import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { AccountBackend,LogonBackend  } from './backend.js';
import { Account } from './models/account';
import { MaintenanceService } from './api/maintenance.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private maintenanceService: MaintenanceService) { }
  private afterPreparation = [];
  private failedPreparation = [];

  waitForBackend(): Promise<void> {
    console.log("waiting for maintenanceService");
    this.maintenanceService.retrieveInfo();
    return Promise.resolve();
    /*
    if (this.backend) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.afterPreparation.push(resolve);
      this.failedPreparation.push(reject);
    });
  */
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
