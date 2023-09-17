import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventories } from 'src/app/interfaces/inventories.interface';
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