import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { UserOptionsComponent } from './user-options/user-options.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { CsvImportComponent } from './csv-import/csv-import.component';
import { CsvDestinationSelectorComponent } from './csv-import/csv-destination-selector/csv-destination-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatListModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SidenavAuthenticatedComponent } from './sidenav-authenticated/sidenav-authenticated.component';
import { SidenavUnauthenticatedComponent } from './sidenav-unauthenticated/sidenav-unauthenticated.component';

import { TestPluginColumnComponent } from './plugins/test-plugin-column/test-plugin-column.component';
import { TestPluginDetailComponent } from './plugins/test-plugin-detail/test-plugin-detail.component';
import { TestPluginEditComponent } from './plugins/test-plugin-edit/test-plugin-edit.component';
import { TestPluginOverviewComponent } from './plugins/test-plugin-overview/test-plugin-overview.component';

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
    UnauthenticatedComponent,
    AuthenticatedComponent,
    EditAccountComponent,
    UserOptionsComponent,
    UserPasswordComponent,
    CsvImportComponent,
    CsvDestinationSelectorComponent,
    SidenavAuthenticatedComponent,
    SidenavUnauthenticatedComponent,
    TestPluginColumnComponent,
    TestPluginDetailComponent,
    TestPluginEditComponent,
    TestPluginOverviewComponent
  ],
  entryComponents: [
    EditAccountComponent,
    RegistrationComponent,
    CsvImportComponent,
    UserPasswordComponent,
//plugins. ToDo: add at runtime
    TestPluginDetailComponent,
    TestPluginEditComponent,
    TestPluginOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [/*TouchidService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
