import { Injectable } from '@angular/core';
import { AccountBackend } from './backend.js';
import { EncryptionWrapper } from './cryptoWrapper.js';
import { Account } from './account.js';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }
}
