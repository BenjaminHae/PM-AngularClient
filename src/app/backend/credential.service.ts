import { Injectable } from '@angular/core';
//todo make ciphers configurable

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private key: CryptoKey;

  constructor() { }

  generateFromPassword(password: string): Observable<CryptoKey>{
    return window.crypto.subtle.generateKey(
      {
        name:"AES-GCM", length:256,
      },
      false,
      ["encrypt","decrypt", "wrapKey", "unwrapKey"]
    )
    .then((key) => {
        this.key = key;
      });
    //ToDo return result as observable
  }

  getKey(): CryptoKey {
    return this.key;
  }
}
