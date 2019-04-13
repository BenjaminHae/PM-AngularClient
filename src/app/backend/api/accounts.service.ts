import { Injectable } from '@angular/core';
import { AccountsService as OpenAPIAccountsService, AccountId } from '@pm-server/pm-server';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private accountsService: OpenAPIAccountsService) { }

  getAccounts(): Observable<Array<AccountId>> {
    return this.accountsService.getAccounts();
  }
}
