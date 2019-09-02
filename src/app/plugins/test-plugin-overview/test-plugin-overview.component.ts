import { Component, Input } from '@angular/core';
import { Account } from '../../backend/models/account';
import { PluginAccountListComponentInterface } from '../plugin';
import { BackendService } from '../../backend/backend.service';

@Component({
  selector: 'app-test-plugin-overview',
  template: `
    <p>Found <span *ngIf="backend.accounts">{{backend.accounts.length}}</span> accounts</p>
  `
})
export class TestPluginOverviewComponent implements PluginAccountListComponentInterface {
  @Input() accounts: Array<Account>;

  constructor(private backend: BackendService) { }

}
