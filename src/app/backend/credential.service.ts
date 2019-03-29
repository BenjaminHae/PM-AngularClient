import { Injectable } from '@angular/core';
//todo make ciphers configurable

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private key: CryptoKey;

  constructor() { }

  generateFromPassword(password: string): PromiseLike<CryptoKey>{
    let enc = new TextEncoder();
    return window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        {
          "name": "PBKDF2",
        //the next lines are a trick to get the typescript compiler to accept the type :/
          "generator": new Uint8Array(12),
          "prime": new Uint8Array(12),
        },
        false,
        ["deriveBits", "deriveKey"]
        )
      .then((keyMaterial) => {
//Todo: create salt
          return window.crypto.subtle.deriveKey(
              {"name": "PBKDF2", salt:new ArrayBuffer(0), "iterations": 100000, "hash": "SHA-256" },
              keyMaterial,
              { name: "AES-GCM", length:256, },
              false,
              ["encrypt","decrypt", "wrapKey", "unwrapKey"]
              )
          })
    .then((key) => {
        this.key = key;
        return key;
        });
    //ToDo return result as observable
  }

  getKey(): CryptoKey {
    return this.key;
  }
}
