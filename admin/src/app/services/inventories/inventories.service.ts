import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventories, medicineData } from 'src/app/interfaces/inventories.interface';
import { Student } from 'src/app/interfaces/student.interface';
@Injectable({
  providedIn: 'root'
})
export class InventoriesService {
  server = 'http://127.0.0.1:3005/';
  user: any;
  constructor(private http: HttpClient) {}
  
  public addInventory(data: Inventories, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}inventories`, data, httpOptions)
      .pipe(map((response) => response as Inventories));
  }

  public addMedicine(data: medicineData, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}medicine-taken`, data, httpOptions)
      .pipe(map((response) => response as medicineData));
  }

  public getByStudent(Student: Student, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .get(`${this.server}medicine-taken/student/${Student.id}`, httpOptions)
      .pipe(map((response) => response as medicineData[]));
  }

  

  public getInventories(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .get(`${this.server}inventories`, httpOptions)
      .pipe(map((response) => response as Inventories[]));
  }

}