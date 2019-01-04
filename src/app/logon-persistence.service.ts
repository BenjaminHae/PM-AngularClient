import { Injectable, OnInit } from '@angular/core';
import { AccountBackend } from './backend/backend';
import { TouchidService } from './touchid.service';

function getFromLocalStorage(key: string): string {
  return "";
}

const keychainKey: string = "passphraseData";
const keychainMessage: string = "Please authenticate to access your passwords.";

export enum StoredData {
  None, Keys, KeysAndToken, KeysAndHash
}
export enum StorageMethod {
  None, Keychain, PIN
}

interface KeyData {
  confkey: string;
  secretkey: string;
}

@Injectable({
  providedIn: 'root'
})

export class LogonPersistenceService implements OnInit {

  private storedAuthentication: StoredData = StoredData.None;
  private storageMethod: StorageMethod = StorageMethod.None;
  storedAccounts: boolean = false;

  constructor(private touchidService: TouchidService) { }

  ngOnInit() {
    this.keychainPresent()
      .then(() => {
          this.storageMethod = StorageMethod.Keychain;
          });
    //check pin is available
    //todo check whether accounts are stored
  }

  private keychainPresent(): Promise<void> {
    return this.touchidService.available()
      .then(() => {
          return this.touchidService.hasKey(keychainKey);
          })
  }

  private pinPresent(): void {
  }

  clearData(): void {
  }

  authenticationStored(): boolean {
    return this.storedAuthentication != StoredData.None;
  }

  logonDone(backend: AccountBackend, password: string): Promise<void> {
    if (this.storedAuthentication !== StoredData.None && this.storageMethod !== StorageMethod.None) {
      let data: KeyData;
      data.secretkey = getFromLocalStorage("pwdsk");
      data.confkey = getFromLocalStorage("confusion_key");
      if (this.storedAuthentication == StoredData.KeysAndHash) {
        //Todo: get password
        //data["pwhash"] =
      }
      if (this.storageMethod == StorageMethod.Keychain) {
        return this.touchidService.saveKey(keychainKey, JSON.stringify(data));
      } else if (this.storageMethod == StorageMethod.PIN) {
        //Todo: store using pin
      }
    }
    return Promise.resolve();
  }

  retrieveCredentials(): KeyData {
    if (this.storedAccounts) {
      if (this.storageMethod == StorageMethod.Keychain) {
        this.touchidService.getKey(keychainKey, keychainMessage)
          .then((data) => {
              return JSON.parse(data);
              });
      }
    }
    return null;
  }

}
