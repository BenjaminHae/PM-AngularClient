import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { RegistrationInformation } from '@pm-server/pm-server';

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

  constructor(private backend:BackendService) {
  }

  ngOnInit() {
  }

  register() {
    if (this.passwordRepeat !== this.password) {
      return;
    }
    this.backend.register(this.username, this.password, this.email);
  }

}
