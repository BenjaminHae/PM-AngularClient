import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  private message: string;
  private currentPassword: string;
  private newPassword1: string;
  private newPassword2: string;

  constructor(private backend: BackendService) { }

  ngOnInit() {
  }

  changePassword() {
    console.log(this.newPassword1);
    this.backend.changeUserPassword(this.newPassword1)
      .then((obs)=>{
          obs
          .subscribe(()=> {
              this.message = "Successful, please reload and relogin";
              });
          });
  }
}
