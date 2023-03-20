import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  configUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }


  // getData(): Observable<HttpResponse<any>> {
  //   return this.http.get(
  //     this.configUrl, { observe: 'response' });
  // }


  getData(functionName: any) {
    return this.http.get(this.configUrl + functionName)
  }

  postData(functionName: any, data: any) {
    return this.http.post(this.configUrl + functionName, data)
  }

}
