import { Injectable } from '@angular/core';
import { AccountsService as OpenAPIAccountsService, AccountId } from '@pm-server/pm-server';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { encryptedAccount } from '../models/encryptedAccount';
import { AccountTransformerService } from '../controller/account-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private accountsService: OpenAPIAccountsService, private accountTransformer: AccountTransformerService) { }

  //Maps OpenAPI Accounts to encryptedAccounts
  private mapAccounts(): OperatorFunction<Array<AccountId>, Array<encryptedAccount>> {
    return map((accounts: Array<AccountId>): Array<encryptedAccount> => {
            return accounts.map((account: AccountId) => {
                return this.accountTransformer.encryptedAccountFromOpenAPI(account);
                });
            });
  }

  getAccounts(): Observable<Array<encryptedAccount>> {
    return this.accountsService.getAccounts()
      .pipe(this.mapAccounts());
  }

  addAccount(account: encryptedAccount): Observable<any> {
    return this.addAccounts([account]);
  }

  addAccounts(accounts: Array<encryptedAccount>): Observable<any> {
    return this.accountsService.addAccounts(accounts.map(this.accountTransformer.encryptedAccountToOpenAPI))
      .pipe(this.mapAccounts());
  }

  updateAccount(account: encryptedAccount): Observable<any> {
    return this.accountsService.updateAccount(account.index, this.accountTransformer.encryptedAccountToOpenAPI(account))
      .pipe(this.mapAccounts());
  }

  deleteAccount(index: number) {
    return this.accountsService.deleteAccount(index)
      .pipe(this.mapAccounts());
  }
}
