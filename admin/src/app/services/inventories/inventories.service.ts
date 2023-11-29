import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventories, Stocks, medicineData } from 'src/app/interfaces/inventories.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { deleteReponse } from 'src/app/interfaces/deleteresponse.interface';
@Injectable({
  providedIn: 'root'
})
export class InventoriesService {
  server = 'http://localhost:3005/';
  // server = 'http://3.25.145.56:3005/';
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

  public addInjury(data: any, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}injury`, data, httpOptions)
      .pipe(map((response) => response as any));
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
  

  public addStocks(data: any, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}stocks`, data, httpOptions)
      .pipe(map((response) => response as Stocks));
  }

  public deleteInventory(inventories: Inventories, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .delete(`${this.server}inventories/${inventories.id}`, httpOptions)
      .pipe(map((response) => response as deleteReponse));
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

  public getInjuries(token: string,id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .get(`${this.server}injury/${id}`, httpOptions)
      .pipe(map((response) => response as any[]));
  }

  public reportIncoming(startDate: any, endDate: any,token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}stocks/incoming`,{startDate,endDate}, httpOptions)
      .pipe(map((response) => response as any[]));
  }

  public reportOutcoming(startDate: any, endDate: any,token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${this.server}medicine-taken/outcoming`,{startDate,endDate}, httpOptions)
      .pipe(map((response) => response as any[]));
  }

}