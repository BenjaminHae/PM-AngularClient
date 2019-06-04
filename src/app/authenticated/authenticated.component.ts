import { Component, OnInit } from '@angular/core';
import { Account } from '../backend/models/account';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {
  public selectedAccount: Account = null;

  constructor() { }

  ngOnInit() {
  }

}
