import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../backend/account';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Input() set account(account: Account) {
    this.transformer.getPassword(account)
      .then((password) => {
        this.password = password;
      });
  }

  transformer: AccountTransformerService;
  password: string;

  constructor(transformer AccountTransformerService) {
    this.transformer = transformer;
  }

  ngOnInit() {
  }

  clearPassword() {
    this.password = undefined;
  }
}
