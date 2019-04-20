import { Injectable } from '@angular/core';
import { CredentialProvider } from './controller/credentialProvider';
//todo make ciphers configurable

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  public credentialProvider: CredentialProvider

  constructor() {
    this.credentialProvider = new CredentialProvider();
  }

  generateFromPassword(password: string): PromiseLike<CryptoKey>{
    return this.credentialProvider.generateFromPassword(password);
  }

  getKey(): CryptoKey {
    return this.credentialProvider.getKey();
  }
}
