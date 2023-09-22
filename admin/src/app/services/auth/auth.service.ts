import { Injectable } from '@angular/core';
import { User, UserToken } from '../../interfaces/user.interface'; 
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  constructor(
    private cookieService: CookieService,
    public jwtHelper: JwtHelperService, 
  ) {}

  public async init(): Promise<UserToken> {
    const userToken: UserToken = {
      token: '',
      id: 0,
      user: '',
      role: ''
    };
    userToken.id =  +this.cookieService.get('id');
    userToken.token =  this.cookieService.get('token');
    userToken.role =  this.cookieService.get('role');
    userToken.user =  this.cookieService.get('user');

    return await new Promise(async (resolve, reject) => {
      resolve(userToken);
    });
  }

  public isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
