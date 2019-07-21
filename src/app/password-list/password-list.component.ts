import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Account } from '../backend/models/account';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
export class PasswordListComponent implements OnInit {
  @Output() updateAccount = new EventEmitter();

  activeColumns = ['name','password'];

  accounts: Account[];

  constructor(public backend: BackendService, private dialog: MatDialog) { }

  ngOnInit() {
  	this.getAccounts();
  }

  getAccounts(): void {

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
