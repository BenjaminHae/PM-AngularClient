import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private password: string = "";
  private passwordRepeat: string = "";
  private email: string = "";
  private username: string = "";
  private message: string = "";

  constructor(private backend:BackendService) {
  }

  ngOnInit() {
  }

  register() {
    if (this.passwordRepeat !== this.password) {
      this.message = "password mismatch";
      return;
    }
    this.backend.register(this.username, this.password, this.email)
      .then((observable) => {
          observable.subscribe(()=> {
              this.message = "registrating successful";
              });
          });
  }

}
