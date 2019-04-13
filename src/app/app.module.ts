import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiModule, BASE_PATH } from '@pm-server/pm-server';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { AccountComponent } from './account/account.component';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
//import { TouchidService } from './touchid.service';
import { environment } from '../environments/environment';

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
    AppRoutingModule,
    FormsModule,
    ApiModule,
    HttpClientModule
  ],
  providers: [{provide: BASE_PATH, useValue: environment.API_BASE_PATH}/*, TouchidService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
