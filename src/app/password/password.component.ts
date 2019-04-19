import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../backend/models/account';
import { AccountTransformerService } from '../backend/controller/account-transformer.service';

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

  password: string;

  constructor(private transformer: AccountTransformerService) {
  }

  ngOnInit() {
  }

  clearPassword() {
    this.password = undefined;
  }

  passwordClick() {
    this.clearPassword();
  }
}
