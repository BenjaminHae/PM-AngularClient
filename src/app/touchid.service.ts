import { Injectable } from '@angular/core';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class TouchidService {

  constructor() { }

  is_installed(): boolean {
    if (_window().plugins.touchid) {
      return true;
    }
    return false;
  }

  available(): Promise<any> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.isAvailable(resolve, reject);
    });
  }

  hasKey(key: String): Promise<String> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.has(key, resolve, reject);
    });
  }

  saveKey(key: String, value: String): Promise<any> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.save(key, value, resolve, reject);
    });
  }

  getKey(key: String, message: String): Promise<String> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.verify(key, message, resolve, reject);
    });
  }

  deleteKey(key: String): Promise<any> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.delete(key, resolve, reject);
    });
  }

}
