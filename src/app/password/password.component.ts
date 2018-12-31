import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../backend/account';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Input() set account(account: Account) {
    account.getPassword()
      .then((pwd) => {
        this.password = pwd;
      });
  }
  password: String;

  constructor() { }

  ngOnInit() {
  }

}
