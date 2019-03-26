import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(credentials: CredentialService) { }

  decryptChar(ciphertext: string, iv: ArrayBuffer): Promise<string> {
    return window.crypto.subtle.decrypt(
      {
        "AES-GCM",
        iv: iv,
      }
      credentials.getKey(),
      ciphertext
    )
    .then((plaintext) => {
      return this.ab2str(plaintext);
    });
  }

  encryptChar(plaintext: string): Promise<string> {
    let iv = window.crypto.getRandomValues(new Uint8Array(12));
    return window.crypto.subtle.encrypt(
      {
        "AES-GCM",
        iv: iv,
      }
      credentials.getKey(),
      this.str2ab(plaintext)
    )
    .then((ciphertext) => {
      return {"ciphertext": Uint8Array(ciphertext), "iv":iv};
    });
  }


  private function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
  private function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
