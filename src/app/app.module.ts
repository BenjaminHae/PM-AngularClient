import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiModule, BASE_PATH, Configuration, ConfigurationParameters } from '@pm-server/pm-server';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { AccountComponent } from './account/account.component';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
//import { TouchidService } from './touchid.service';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';

export function apiConfigFactory(): Configuration{
  const params: ConfigurationParameters = {
    apiKeys: {},
    basePath: environment.API_BASE_PATH
    // set configuration parameters here.
  }
  return new Configuration(params);
}
@NgModule({
  declarations: [
    AppComponent,
    PasswordListComponent,
    AccountComponent,
    PasswordComponent,
    LoginComponent,
    RegistrationComponent,
    UnauthenticatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule
  ],
  providers: [/*TouchidService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
