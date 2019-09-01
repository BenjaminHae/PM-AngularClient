import { Component, Input } from '@angular/core';
import { Account } from '../../backend/models/account';
import { PluginAccountComponentInterface } from '../plugin';

@Component({
  selector: 'app-test-plugin-edit',
  template: `
      <div class="row">
        <div class="col">
          <mat-form-field class="full-width">
            <mat-label>Something</mat-label>
            <input matInput placeholder="Something" formControlName="something"/>
          </mat-form-field>
        </div>
      </div>
    `
})
export class TestPluginEditComponent implements PluginAccountComponentInterface {
  @Input() account: Account;

  constructor() { }

  ngOnInit() {
  }

}
