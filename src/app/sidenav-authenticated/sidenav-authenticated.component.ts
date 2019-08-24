import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPasswordComponent } from '../user-password/user-password.component';
import { CsvImportComponent } from '../csv-import/csv-import.component';

@Component({
  selector: 'app-sidenav-authenticated',
  templateUrl: './sidenav-authenticated.component.html',
  styleUrls: ['./sidenav-authenticated.component.css']
})
export class SidenavAuthenticatedComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  importData() {
    this.dialog.open(CsvImportComponent, {data: {}});
  }

  exportData() {
  }

  backupData() {
  }

  changePassword() {
    this.dialog.open(UserPasswordComponent, {data: {}});
  }
}
