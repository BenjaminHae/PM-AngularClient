import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
export class EditAccountComponent {
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

  constructor(private backend:BackendService, private crypto: CryptoService, private accountTransformer: AccountTransformerService, private fb: FormBuilder, public dialogRef: MatDialogRef<EditAccountComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    if ("account" in data) {
      this.setUpdateAccount(data["account"]);
    }
    else {
      this.account = new Account(null, "", null);
    }
  }

  setUpdateAccount(account: Account) {
    this.account = account;
    if (this.account) {
      console.log(this.account);
      console.log(this.editAccountForm.controls);
      this.editAccountForm.controls.username.setValue(this.account.name);
      this.editAccountForm.controls.password.setValue("");
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
        });
  }

  deleteAccount() {
    this.backend.deleteAccount(this.account)
      .subscribe(()=> {
          this.message = "deleted successfully";
          });
  }

  abort() {
    this.dialogRef.close();

  }

  passwordToggle() {
    console.log("password Toggle");
    this.hide = !this.hide;
      console.log(this.editAccountForm.controls.password.value);
    if (!this.hide && this.editAccountForm.controls.password.value == "") {
      console.log("trying to show password");
      this.accountTransformer.getPassword(this.account)
        .then((password) => {
            console.log("write password to update");
            this.editAccountForm.controls.password.setValue(password);
            });
    }
  }
}
