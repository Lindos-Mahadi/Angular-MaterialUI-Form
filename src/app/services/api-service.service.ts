import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  //  POST DATA ACTION METHOD
  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }

  //  GET DATA ACTION METHOD
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  //  PUT DATA ACTION METHOD
  putProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data);
  }

  //  DELETE DATA ACTION METHOD
  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/productList/" + id);
  }
}
