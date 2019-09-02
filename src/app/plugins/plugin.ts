import { Account } from '../backend/models/account';

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
}
