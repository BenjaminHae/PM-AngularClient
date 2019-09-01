import { Component, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
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
// ToDo: https://stackoverflow.com/questions/34947154/angular-2-viewchild-annotation-returns-undefined
  @ViewChild('plugintest', {static: false, read: ViewContainerRef}) set ft(pluginColumn: ViewContainerRef) {
    setTimeout(() => {
        //if(pluginColumn) {
        //  this.pluginManager.fillTableColumns(pluginColumn);
        //}
      });
  };

  activeColumns = ['name','password'];

  accounts: Account[];

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
