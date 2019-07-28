import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav-unauthenticated',
  templateUrl: './sidenav-unauthenticated.component.html',
  styleUrls: ['./sidenav-unauthenticated.component.css']
})
export class SidenavUnauthenticatedComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  register() {
    this.dialog.open(RegistrationComponent, {data: {}});
  }

}
