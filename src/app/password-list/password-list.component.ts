import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Account } from '../backend/models/account';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PluginManagerService } from '../plugins/plugin-manager.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PasswordListComponent {
  @Output() updateAccount = new EventEmitter();

  activeColumns = ['name','password'];

  constructor(public backend: BackendService, private pluginManager: PluginManagerService, private dialog: MatDialog) {
  }

  selectedAccount: Account;
  onSelect(account: Account): void {
    this.selectedAccount = this.selectedAccount === account ? null : account;
  }

  updateAccountClick(account: Account): void {
    this.dialog.open(EditAccountComponent, {data: {account: account}});
  }

  addAccountClick(): void {
    this.dialog.open(EditAccountComponent, {data: {}});
  }

}
