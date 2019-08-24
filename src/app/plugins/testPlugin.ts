import { Account } from '../backend/models/account';
import { PluginAccountComponentInterface, PluginAccountListComponentInterface, PluginInterface } from './plugin';

export class TestPlugin implements PluginInterface {
  TableColumnComponent(): PluginAccountComponentInterface | null {
    return null;
  }
  TableColumnHeader(): string | null {
    return "index";
  }

  DetailElementComponent(): PluginAccountComponentInterface | null {
    return null;
  }

  EditElementComponent(): PluginAccountComponentInterface | null {
    return null;
  }

  OverviewComponent(): PluginAccountListComponentInterface | null {
    return null;
  }

  modifyAddAccount(account: Account): Account {
    return account;
  }

  modifyEditAccount(oldAccount: Account, account: Account): Account {
    return account;
  }

  accountsLoaded(accounts: Array<Accounts>): void {
  }

  tableRowDraw(account: Account, row: any): void {
  }

}
