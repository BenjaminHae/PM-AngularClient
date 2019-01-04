import { Component, OnInit } from '@angular/core';
import { LogonPersistenceService } from '../logon-persistence.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logonNecessary = true;
  storeLogin = true;

  constructor(private logonPersistence: LogonPersistenceService) { }

  ngOnInit() {
    if (this.logonPersistence.authenticationStored()) {
      this.logonNecessary = false;
      this.doStoredLogon();
    }
  }

  doStoredLogon(): Promise<any> {
      this.logonPersistence.retrieveCredentials();
      return Promise.resolve();
  }

  doCredentialLogon(): Promise<any> {
      return Promise.resolve();
  }

}
