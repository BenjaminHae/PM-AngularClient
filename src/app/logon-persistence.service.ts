import { Injectable } from '@angular/core';
//import { AccountBackend } from './backend/backend';
import { TouchidService } from './touchid.service';

function getFromLocalStorage(key: string): string {
  return sessionStorage.getItem(key);
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

export class LogonPersistenceService {

  private storedAuthentication: StoredData = StoredData.None;
  private storageMethod: StorageMethod = StorageMethod.None;
  storedAccounts: boolean = false;
  private waitingForKeychain: boolean = false;
  private waitingForKeychainResponse: Array<any> = [];
  private keychainLoaded: boolean = false;

  constructor(private touchidService: TouchidService) { }

  ngOnInit() {
  }

  waitForKeychain(): Promise<boolean> {
    console.log('called waitForKeychain');
    if (this.keychainLoaded) {
      console.log('resolving');
      return Promise.resolve(this.authenticationStored());
    }
    if (this.waitingForKeychain) {
      console.log('add to wait chain');
      return new Promise((resolve, reject) => {
          this.waitingForKeychainResponse.push(resolve);
        });
    }
    console.log("checking for keychain");
    return this.keychainPresent()
      .catch(()=>{
        throw "keychain";
      })
      .then(() => {
          console.log("keychain present");
          this.storageMethod = StorageMethod.Keychain;
          return this.touchidService.hasKey(keychainKey);
        })
      .catch((e)=>{
        console.log("error happened in hasKey"+e);
      })
      .then(() => {
        console.log("has key");
        this.storedAuthentication = StoredData.KeysAndHash;
      })
      .then(() => {
        console.log("result ready");
        this.waitingForKeychain = false;
        let result = this.authenticationStored();
        while (this.waitingForKeychainResponse.length > 0) {
          console.log("  calling event");
          this.waitingForKeychainResponse.pop()(result);
        }
        return result;
      });
    //check pin is available
    //todo check whether accounts are stored
  }

  private keychainPresent(): Promise<void> {
    return this.touchidService.available()
      .then((info) => {});
  }

  private pinPresent(): void {
  }

  clearData(): void {
  }

  authenticationStored(): boolean {
      return this.storedAuthentication != StoredData.None;
  }

  /*storeCredentials(backend: AccountBackend, password: string): Promise<void> {
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
  }*/

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
