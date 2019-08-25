import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BackendService } from '../backend/backend.service';

// show errors in controls when form has error
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  userPasswordForm = this.fb.group({
    currentPassword: [null, Validators.required],
    newPassword1: [null, [Validators.required, Validators.minLength(8)]],
    newPassword2: [null],
  }, { validator: this.passwordConfirmValidation });
  public message: string = "";
  public hide: boolean = true;
  public hideOriginal: boolean = true;
  formErrorMatcher = new CrossFieldErrorMatcher();

  // see https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6
  passwordConfirmValidation(group: FormGroup) {
    let pass = group.controls.newPassword1.value;
    let confirmPass = group.controls.newPassword2.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private backend: BackendService, private fb: FormBuilder, public dialogRef: MatDialogRef<UserPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  changePassword() {
    if (this.userPasswordForm.controls.newPassword1.value !== this.userPasswordForm.controls.newPassword2.value) {
      this.message = "new passwords do not match";
      return
    }
    this.backend.verifyPassword(this.userPasswordForm.controls.currentPassword.value)
      .then((result) => {
          if (!result) {
            console.log("old password does not match!");
            this.message = "old password does not match";
            return Promise.reject();
          }
          console.log("old password matches!");
          return this.backend.changeUserPassword(this.userPasswordForm.controls.newPassword1.value)
          })
    .then((obs)=>{
        obs
        .subscribe(()=> {
            this.message = "Successful, please reload and relogin";
            });
        })
  }

  abort() {
    this.dialogRef.close();
  }

  public hasError(controlName: string, errorName: string) {
    return this.userPasswordForm.controls[controlName].hasError(errorName);
  }

  public formHasError(errorName: string) {
    return this.userPasswordForm.hasError(errorName);
  }
}
