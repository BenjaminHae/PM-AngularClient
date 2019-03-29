import { Injectable } from '@angular/core';
import { CredentialService } from './credential.service';

@Injectable({
  providedIn: 'root'
})
export class CryptedObject {
  iv: ArrayBuffer;
  ciphertext: ArrayBuffer;
  constructor(iv: ArrayBuffer, ciphertext: ArrayBuffer) {
    this.iv = iv;
    this.ciphertext = ciphertext;
  }
  static fromBase64JSON(encodedObject: string): CryptedObject {
    let encObject = JSON.parse(encodedObject);
    return new CryptedObject(CryptedObject._base64ToArrayBuffer(encObject.iv), CryptedObject._base64ToArrayBuffer(encObject.ciphertext));
  }
  toBase64JSON(): string {
    return JSON.stringify({"iv": CryptedObject._BufferToBase64(this.iv), "ciphertext": CryptedObject._BufferToBase64(this.ciphertext)});
  }
  static _BufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa(binary);
  }
  static _base64ToArrayBuffer(base64: string): ArrayBuffer {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
   return bytes.buffer;
  }
}
export class CryptoService {

  credentials: CredentialService;

  constructor(credentials: CredentialService) {
    this.credentials = credentials;
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

  encryptChar(plaintext: string): PromiseLike<CryptedObject> {
    let iv = window.crypto.getRandomValues(new Uint8Array(12));
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
