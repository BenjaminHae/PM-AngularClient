import { Component, OnInit } from '@angular/core';
import { LogonPersistenceService } from '../logon-persistence.service';
import { BackendService } from '../backend/backend.service';
//import { UserService } from '@pm-server/pm-server';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logonNecessary: boolean  = true;
  storeLogin: boolean  = true;
  storedLoginAvailable: boolean = false;

  username: string = "tester";
  password: string = "testtest2";
  message: string = "wait for button click";

  constructor(/*private userApi: UserService*//*private logonPersistence: LogonPersistenceService, private backendService: BackendService*/) {
  }

  ngOnInit() {
    /*
    this.logonPersistence.waitForKeychain()
      .then((result) => {
        if (result) {
          this.storedLoginAvailable = true;
          this.message += "; AUTHENTICATION STORED";
          //this.logonNecessary = false;
          //this.doStoredLogon();
        }
        else {
          this.message += "; AUTHENTICATION NOT STORED";
        }
      });
    */
  }

  doStoredLogon(): Promise<any> {
      /*this.logonPersistence.retrieveCredentials();*/
      return Promise.resolve();
  }

  doCredentialLogon(): void {
    this.message += "; Logging in";
 /*   this.userApi.loginUser({"username":this.username, "password": this.password })
      .subscribe(console.log);*/
    /*
    this.backendService.prepareBackend(this.username, this.password)
      .then((backend) => {
        this.message += "; Logon successful, storing credentials";
        return this.logonPersistence.storeCredentials(backend, this.password);
      })
      .then(() => {
        this.message += "; stored credentials";
        return;
      })
      .catch((error) => {
        this.message += "; error: "+ error;
      });
    */
  }

}
