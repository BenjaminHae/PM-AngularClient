import { Injectable } from '@angular/core';
import { AccountsService as OpenAPIAccountsService, AccountId } from '@pm-server/pm-server';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { encryptedAccount } from '../models/encryptedAccount';
import { AccountTransformerService } from '../controller/account-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private accountsService: OpenAPIAccountsService, private accountTransformer: AccountTransformerService) { }

  getAccounts(): Observable<Array<encryptedAccount>> {
    return this.accountsService.getAccounts()
      .pipe(
          map((accounts: Array<AccountId>): Array<encryptedAccount> => {
            return accounts.map((account: AccountId) => {
                return this.accountTransformer.encryptedAccountFromOpenAPI(account);
                });
            })
          );
  }

  addAccount(account: encryptedAccount): Observable<any> {
    return this.accountsService.addAccount(this.accountTransformer.encryptedAccountToOpenAPI(account));
  }
}
