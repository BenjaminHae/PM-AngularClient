import { Component } from '@angular/core';

@Component({
  selector: 'app-test-plugin-column',
  template: `
    <ng-container matColumnDef>
      <th mat-header-cell *matHeaderCellDef> index </th>
      <td mat-cell *matCellDef="let account">test {{account.index}}</td>
    </ng-container>`
})
export class TestPluginColumnComponent {

  constructor() { }

  ngOnInit() {
  }

}
