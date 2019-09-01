import { Component, Input } from '@angular/core';
import { PluginAccountComponentInterface } from '../plugin';
import { Account } from '../../backend/models/account';

@Component({
  selector: 'app-test-plugin-detail',
  template: `
  <p>Index: {{ account.index }}</p>
    `
})
export class TestPluginDetailComponent implements PluginAccountComponentInterface {
  @Input() account: Account;

  constructor() { }

  ngOnInit() {
  }

}
