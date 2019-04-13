import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { CryptedObject } from '../models/cryptedObject';
import { Account } from '../models/account';
import { encryptedAccount } from '../models/encryptedAccount';
import { AccountId as OpenAPIAccountId } from '@pm-server/pm-server';

@Injectable({
  providedIn: 'root'
})
export class AccountTransformerService {

  constructor(private crypto: CryptoService) {
  }

  encryptAccount(account: Account): PromiseLike<encryptedAccount> {
    let name: CryptedObject;
    let password: CryptedObject;
    let other: CryptedObject;
    return this.crypto.encryptChar(account.name)
      .then((_name: CryptedObject) => {
          name = _name;
          return this.crypto.encryptChar(account.getOtherJSON());
        })
      .then((_other: CryptedObject) => {
          other = _other;
          return new encryptedAccount(account.index, name, account.enpassword, other);
        });
  }

  decryptAccount(encrypted: encryptedAccount): PromiseLike<Account> {
    let name: string;
    let other: string;
    return this.crypto.decryptChar(encrypted.name)
      .then((_name) => {
        name = _name;
        return this.crypto.decryptChar(encrypted.other);
      })
      .then((_other) => {
        other = _other;
        let account = new Account(encrypted.index, name, encrypted.password);
        account.other = JSON.parse(_other);
        return account;
      });
  }

  getPassword(account: Account): PromiseLike<string> {
    return this.crypto.decryptChar(account.enpassword);
  }

  encryptedAccountFromOpenAPI(apiAccount: OpenAPIAccountId): encryptedAccount {
    return new encryptedAccount(
        apiAccount.index,
        CryptedObject.fromBase64JSON(apiAccount.name),
        CryptedObject.fromBase64JSON(apiAccount.password),
        CryptedObject.fromBase64JSON(apiAccount.additional)
        );
  }

  encryptedAccountToOpenAPI(account: encryptedAccount): OpenAPIAccountId {
    return {
      index: account.index,
      name: account.name.toBase64JSON(),
      additional: account.other.toBase64JSON(),
      password: account.password.toBase64JSON()
    };
  }
}
