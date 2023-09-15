import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User, UserLogin, UserToken } from '../../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from 'src/app/interfaces/student.interface';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  server = 'http://127.0.0.1:3005/';
  user: any;
  constructor(private http: HttpClient) {}

  public addStudent(data: Student, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}students`, data, httpOptions)
      .pipe(map((response) => response as Student));
  }
  getStudents(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .get(`${this.server}students`, httpOptions)
      .pipe(map((response) => response as Student[]));
  }
}
