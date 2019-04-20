import { Injectable } from '@angular/core';
import { UserService as OpenAPIUserService, RegistrationInformation, AccountId as OpenAPIAccountId, ChangePassword as OpenAPIChangePassword } from '@pm-server/pm-server';
import { Observable } from 'rxjs';
import { CryptedObject } from '../models/cryptedObject';
import { encryptedAccount } from '../models/encryptedAccount';
import { AccountTransformerService } from '../controller/account-transformer.service';
import { } from '@pm-server/pm-server';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userService: OpenAPIUserService, private accountTransformer: AccountTransformerService) { }

  logon(username: string, password: CryptedObject): Observable<any> {
    return this.userService.loginUser({ "username": username, "password": password.toBase64JSON() });
  }

  logout(): Observable<any> {
     return this.userService.logoutUser();
  }

  register(username: string, password: CryptedObject, email: string): Observable<any> {
    return this.userService.registerUser({"username": username, "password": password.toBase64JSON(), "email": email});
  }

  changePassword(newHash: CryptedObject, accounts: Array<encryptedAccount>): Observable<any> {
    let requestData: OpenAPIChangePassword;
    requestData.newPassword = newHash.toBase64JSON();
    requestData.accounts = accounts.map((account) => {
        return this.accountTransformer.encryptedAccountToOpenAPI(account);
        });
    return this.userService.changePassword(requestData);
  }
}
