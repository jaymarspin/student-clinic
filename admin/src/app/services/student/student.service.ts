import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User, UserLogin, UserToken } from '../../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from 'src/app/interfaces/student.interface';
import {deleteReponse}from 'src/app/interfaces/deleteresponse.interface';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  server = 'http://13.57.226.6:3005/';
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

  deleteStudent(data: Student, token: string){
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .delete(`${this.server}students/${data.id}`, httpOptions)
      .pipe(map((response) => response as deleteReponse));
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
