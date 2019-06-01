import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

// show errors in controls when form has error
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(8)]],
    passwordRepeat: [null],
    email: [null, [Validators.required, Validators.email]],
  }, { validator: this.passwordConfirmValidation });
  private message: string = "";
  private hide = true;
  formErrorMatcher = new CrossFieldErrorMatcher();

  // see https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6
  passwordConfirmValidation(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordRepeat.value;

    return pass === confirmPass ? null : { notSame: true }
  }


  constructor(private backend:BackendService, private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  public hasError(controlName: string, errorName: string) {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  public formHasError(errorName: string) {
    return this.registrationForm.hasError(errorName);
  }

  register() {
    if (this.registrationForm.controls.passwordRepeat.value !== this.registrationForm.controls.password.value) {
      this.message = "password mismatch";
      return;
    }
    this.backend.register(this.registrationForm.controls.username.value, this.registrationForm.controls.password.value, this.registrationForm.controls.email.value)
      .then((observable) => {
          observable.subscribe(()=> {
              this.message = "registrating successful";
              });
          });
  }

}
