import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { CryptoService } from '../backend/crypto.service';
import { AccountTransformerService } from '../backend/controller/account-transformer.service';
import { Account } from '../backend/models/account';
import { CryptedObject } from '../backend/models/cryptedObject';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  @Input() account: Account;
  private password: string = "";
  private message: string = "";

  constructor(private backend:BackendService, private crypto: CryptoService, private accountTransformer: AccountTransformerService) {
  }

  ngOnInit() {
    this.password = "";
    if(this.account) {
      this.accountTransformer.getPassword(this.account)
        .then((password) => {
            this.password = password;
            });
    }
    else {
      this.account = new Account(null, "", null);
    }
  }

  store() {
    this.crypto.encryptChar(this.password)
      .then((enpassword) => {
          this.account.enpassword = enpassword;
          if (!this.account.index) {
          return this.backend.addAccount(this.account);
          }
          else {
          return this.backend.updateAccount(this.account);
          }
          })
    .then((observable) => {
        observable.subscribe((message)=> {
            this.message = "registrating successful";
            });
        });
  }
}
