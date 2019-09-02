import { Account } from '../backend/models/account';
import { PluginAccountComponentInterface, PluginAccountListComponentInterface, PluginInterface } from './plugin';
import { TestPluginColumnComponent } from './test-plugin-column/test-plugin-column.component';
import { TestPluginDetailComponent } from './test-plugin-detail/test-plugin-detail.component';
import { TestPluginEditComponent } from './test-plugin-edit/test-plugin-edit.component';
import { TestPluginOverviewComponent } from './test-plugin-overview/test-plugin-overview.component';

export class TestPlugin implements PluginInterface {
  TableColumnComponent(): typeof TestPluginColumnComponent {
    return TestPluginColumnComponent;
  }

  DetailElementComponent(): typeof TestPluginDetailComponent {
    return TestPluginDetailComponent;
  }

  EditElementComponent(): typeof TestPluginEditComponent {
    return TestPluginEditComponent;
  }

  OverviewComponent(): typeof TestPluginOverviewComponent {
    return TestPluginOverviewComponent;
  }

  modifyAddAccount(account: Account): Account {
    return account;
  }

  modifyEditAccount(oldAccount: Account, account: Account): Account {
    return account;
  }

  accountsLoaded(accounts: Array<Account>): void {
  }

  tableRowDraw(account: Account, row: any): void {
  }

}
