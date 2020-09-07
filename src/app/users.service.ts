import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL:string ='http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<HttpResponse<any>> {
     const url = this.URL+'/users';
     return this.http.get<any>(url,{observe : 'response'})
  }

  public addUser(userData): Observable<HttpResponse<any>> {
    let params= new HttpParams();
    console.log(userData);
    console.log(typeof(userData))
    params = userData;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.URL+'/users';
    return this.http.post<any>(url, userData, { observe: 'response',params : userData, headers: headers });

  }
}
