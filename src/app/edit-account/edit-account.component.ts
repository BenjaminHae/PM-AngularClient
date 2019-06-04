import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { CryptoService } from '../backend/crypto.service';
import { AccountTransformerService } from '../backend/controller/account-transformer.service';
import { Account } from '../backend/models/account';
import { CryptedObject } from '../backend/models/cryptedObject';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  editAccountForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    other: [null, Validators.required]
  });
  public hide: boolean = true;
  public account: Account;
  @Input('updateAccount')
  set updateAccount(value: Account) {
    this.setUpdateAccount(value);
  }
  public message: string = "";

  constructor(private backend:BackendService, private crypto: CryptoService, private accountTransformer: AccountTransformerService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.clearForm();
    this.account = new Account(null, "", null);
  }

  clearForm() {
    this.editAccountForm.controls.username.setValue("");
    this.editAccountForm.controls.password.setValue("");
    this.hide = true;
  }

  setUpdateAccount(account: Account) {
    this.account = account;
    this.clearForm();
    if (this.account) {
      console.log(this.account);
      console.log(this.editAccountForm.controls);
      this.editAccountForm.controls.username.setValue(this.account.name);
      console.log("retrieve password");
    }
  }

  storeAccount() {
    this.account.name = this.editAccountForm.controls.username.value;
    //Todo store other
    //Only look at password if it has changed
    let PasswordPromise: PromiseLike<CryptedObject>;
    if (this.editAccountForm.controls.password.value != "") {
      console.log("passwordChanged");
      PasswordPromise = this.crypto.encryptChar(this.editAccountForm.controls.password.value);
    }
    else if (!this.account.index) {
      // Todo auto-generate password
      console.log("Todo auto generate password");
      PasswordPromise = this.crypto.encryptChar(this.editAccountForm.controls.password.value);
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
        this.resetForm();
        });
  }

  deleteAccount() {
    this.backend.deleteAccount(this.account)
      .subscribe(()=> {
          this.message = "deleted successfully";
          this.resetForm();
          });
  }

  abort() {
    this.resetForm();
  }

  passwordToggle() {
    this.hide = !this.hide;
    if (!this.hide && this.editAccountForm.controls.password.value == "") {
      this.accountTransformer.getPassword(this.account)
        .then((password) => {
            console.log("write password to update");
            this.editAccountForm.controls.password.setValue(password);
            });
    }
  }
}
