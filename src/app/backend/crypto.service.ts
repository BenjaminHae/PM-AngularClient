import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(credentials: CredentialService) { }

  decryptChar(ciphertext: string): string { }

  encryptChar(plaintext: string): string { }


}
