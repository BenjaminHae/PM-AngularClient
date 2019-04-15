import { Injectable } from '@angular/core';
import { CredentialService } from './credential.service';
import { CryptedObject } from './models/cryptedObject';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private credentials: CredentialService) {
  }

  decryptChar(crypt: CryptedObject): PromiseLike<string> {
    return window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: crypt.iv,
      },
      this.credentials.getKey(),
      crypt.ciphertext
    )
    .then((plaintext) => {
      return this.ab2str(plaintext);
    });
  }

  encryptChar(plaintext: string, iv = window.crypto.getRandomValues(new Uint8Array(12))): PromiseLike<CryptedObject> {
    return window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      this.credentials.getKey(),
      this.str2ab(plaintext)
    )
    .then((ciphertext) => {
      return new CryptedObject(iv, new Uint8Array(ciphertext));
    });
  }


  private ab2str(buf): string{
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
  private str2ab(str): ArrayBuffer{
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
