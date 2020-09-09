import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
// https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/
export class UsersService {
  URL:string ='http://localhost:3000';
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<HttpResponse<any>> {
    const url = this.URL+'/users';
    return this.http.get<any>(url,{observe : 'response'})
  }
  //*******update user************
  public addUser(userData): Observable<HttpResponse<any>> {
    let params= new HttpParams();
    console.log(userData);
    console.log(typeof(userData))
    params = userData;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.URL+'/users';
    return this.http.post<any>(url, userData, { observe: 'response',params : userData, headers: headers });
  }
  public updateUser(userData) {
    let params= new HttpParams();
    console.log(userData);
    console.log(typeof(userData))
    params = userData;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.URL+'/users'+'/'+userData.id;
    console.log(url)
    return this.http.put<any>(url, userData, { observe: 'response', headers: headers });
  }
  public deleteUser(userID){
    let params= new HttpParams();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = this.URL+'/users'+'/'+userID;
    console.log(url)
    return this.http.delete<any>(url, { observe: 'response', headers: headers });
  }
  
}
