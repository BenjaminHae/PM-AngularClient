import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { AccountComponent } from './account/account.component';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
import { TouchidService } from './touchid.service';

@NgModule({
  declarations: [
    AppComponent,
    PasswordListComponent,
    AccountComponent,
    PasswordComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TouchidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
