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
export class EditAccountComponent implements OnInit {
  private account: Account;
  @Input('updateAccount')
  set updateAccount(value: Account) {
    this.account = value;
  }
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

  storeAccount() {
    //Only look at password if it has changed
    let PasswordPromise: PromiseLike<CryptedObject>;
    if (this.password != "") {
      console.log("passwordChanged");
      PasswordPromise = this.crypto.encryptChar(this.password);
    }
    else if (!this.account.index) {
      // Todo auto-generate password
      console.log("Todo auto generate password");
      PasswordPromise = this.crypto.encryptChar(this.password);
    }
    else{
      console.log("keeping old password");
      PasswordPromise = Promise.resolve(this.account.enpassword);
    }
    PasswordPromise
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
        })
    .then(() => {
        this.account = new Account(null, "", null);
        });
  }

  deleteAccount() {
    this.backend.deleteAccount(this.account)
      .subscribe(()=> {
              this.message = "deleted successfully";
          });
  }

  reset() {
  }
}
