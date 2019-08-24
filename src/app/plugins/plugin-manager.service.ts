import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PluginManagerService {
  plugins = [];

  constructor() { }
}
