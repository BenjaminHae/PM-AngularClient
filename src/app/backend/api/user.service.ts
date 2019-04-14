import { Injectable } from '@angular/core';
import { UserService as OpenAPIUserService, RegistrationInformation } from '@pm-server/pm-server';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userService: OpenAPIUserService) { }

  logon(username: string, password: string): Observable<any> {
    return this.userService.loginUser({ "username": username, "password": password });
  }

  logout(): Observable<any> {
     return this.userService.logoutUser();
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.userService.registerUser({"username": username, "password": password, "email": email});
  }
}
