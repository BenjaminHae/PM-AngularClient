import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  public message: string;
  public currentPassword: string;
  public newPassword1: string;
  public newPassword2: string;

  constructor(private backend: BackendService) { }

  ngOnInit() {
  }

  changePassword() {
    console.log(this.newPassword1);
    if (this.newPassword1 !== this.newPassword2) {
      this.message = "new passwords do not match";
      return
    }
    this.backend.verifyPassword(this.newPassword1)
      .then((result) => {
          if (!result) {
            this.message = "old password does not match";
            return Promise.reject();
          }
          return this.backend.changeUserPassword(this.newPassword1)
          })
    .then((obs)=>{
        obs
        .subscribe(()=> {
            this.message = "Successful, please reload and relogin";
            });
        })
  }
}
