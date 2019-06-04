import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Account } from '../backend/models/account';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {
  @Output() updateAccount = new EventEmitter();

  activeColumns = ['name','password'];

  accounts: Account[];

  constructor(public backend: BackendService) { }

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
    this.updateAccount.emit(account);
  }

}
