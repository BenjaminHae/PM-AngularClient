import { Account } from '../backend/models/account';
import { FormGroup } from '@angular/forms';

export interface PluginAccountComponentInterface {
  account: Account;
}

export interface PluginAccountListComponentInterface {
  accounts: Array<Account>;
}

export interface PluginInterface {
  TableColumnComponent(): any;
  DetailElementComponent(): any;
  EditElementComponent(): any;

  OverviewComponent(): any;

  modifyAddAccount(account: Account): Account;
  modifyEditAccount(oldAccount: Account, account: Account): Account;

  accountsLoaded(accounts: Array<Account>): void;

  tableRowDraw(account: Account, row: any): void;

  formEdit(form: FormGroup): void;
}
