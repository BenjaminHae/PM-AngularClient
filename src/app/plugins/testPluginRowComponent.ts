import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../backend/models/account';

@Component({
  template: `<td mat-cell *matCellDef="let account">test {{account.index}}</td>`;
  style: ``;
})
export class TestPluginRowComponent {
  @Input('account')
  account: Account;

  constructor() {
  }
}
