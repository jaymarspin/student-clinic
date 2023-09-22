import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User, UserLogin, UserToken } from '../../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { deleteReponse } from 'src/app/interfaces/deleteresponse.interface';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  server = 'http://13.57.226.6:3005/';
  user: any;
  constructor(private http: HttpClient) {}

  public register(data: User,token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}users`, data,httpOptions)
      .pipe(map((response) => response as User));
  }


  public deleteUser(data: User,token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .delete(`${this.server}users/${data.id}`,httpOptions)
      .pipe(map((response) => response as deleteReponse));
  }
  

  public login(data: UserLogin) {
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

  getUsers(token?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .get(`${this.server}users`,httpOptions)
      .pipe(map((response) => response as User[]));
  }
}
