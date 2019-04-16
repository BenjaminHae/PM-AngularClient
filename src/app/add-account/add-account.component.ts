import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { CryptoService } from '../backend/crypto.service';
import { Account } from '../backend/models/account';
import { CryptedObject } from '../backend/models/cryptedObject';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  private password: string = "";
  private username: string = "";
  private other: string = "";
  private message: string = "";

  constructor(private backend:BackendService, private crypto: CryptoService) {
  }

  ngOnInit() {
  }

  store() {
    this.crypto.encryptChar(this.password)
      .then((enpassword) => {
          let account: Account = new Account(null, this.username, enpassword);
          console.log(account);
          return this.backend.addAccount(account);
          })
    .then((observable) => {
        observable.subscribe((message)=> {
            console.log(message);
            this.message = "registrating successful";
            });
        });
  }
}
