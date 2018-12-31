import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Account } from '../backend/account';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {

  accounts: Account[];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
  	this.getAccounts();
  }

  getAccounts(): void {
    this.backendService.getAccounts()
      .then((accounts: Account[]) => {
        this.accounts = accounts;
      });
  }

  selectedAccount: Account;
  onSelect(account: Account): void {
    this.selectedAccount = account;
  }

}
