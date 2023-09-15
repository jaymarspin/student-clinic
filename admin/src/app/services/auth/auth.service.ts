import { Injectable } from '@angular/core';
import { User, UserToken } from '../../interfaces/user.interface'; 
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: UserToken = {
    token: '',
    id: '',
    user: ''
  };

  constructor(
    private cookieService: CookieService,
    public jwtHelper: JwtHelperService, 
  ) {}

  public async init(): Promise<UserToken> {
    this.userToken.id =  this.cookieService.get('id');
    this.userToken.token =  this.cookieService.get('token');
    return await new Promise(async (resolve, reject) => {
      resolve(this.userToken);
    });
  }

  public isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
