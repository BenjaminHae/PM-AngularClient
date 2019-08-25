import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../backend/models/account';

@Component({
  template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef> index </th>
      <td mat-cell *matCellDef="let account">test {{account.index}}</td>
    </ng-container>`
})
export class TestPluginColumnComponent {
  @Input('account')
  account: Account;

  constructor() {
  }
}
