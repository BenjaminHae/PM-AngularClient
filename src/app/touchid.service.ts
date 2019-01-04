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

  available(): Promise<string> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.isAvailable(resolve, reject);
    });
  }

  hasKey(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.has(key, resolve, reject);
    });
  }

  saveKey(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.save(key, value, resolve, reject);
    });
  }

  getKey(key: string, message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.verify(key, message, resolve, reject);
    });
  }

  deleteKey(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      _window().plugins.touchid.delete(key, resolve, reject);
    });
  }

}
