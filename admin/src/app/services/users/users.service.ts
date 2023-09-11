import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {User, UserToken} from '../../interfaces/user.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  server = '127.0.0.1';
  user: any;
  constructor(private http: HttpClient) {}

  public register(data: User) {
    return this.http
      .post(`${this.server}users`, data)
      .pipe(map((response) => response as User));
  }

  public login(data: User) {
    return this.http
      .post(`${this.server}auth/local/signin`, data)
      .pipe(map((response) => response as UserToken));
  }

  getUser(id: any, token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(`${this.server}users/${id}`, httpOptions);
  }
}
