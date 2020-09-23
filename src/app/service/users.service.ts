import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }
  // *********GETTING USERS LIST BLOCK START******
  public getUsers(): Observable<HttpResponse<any>> {
    const url = environment.apiUrl+'/users';
    return this.http.get<any>(url,{observe : 'response'})
  }
  //*******GETTING USER DETAILS BASED ON USERID BLOCK
   public getUser(userID): Observable<HttpResponse<any>> {
    const url = environment.apiUrl+'/users'+'/'+userID;
    return this.http.get<any>(url,{observe : 'response'})
  }
  // ADDING USER DETAILS IN JSON SERVER BLOCK
  public addUser(userData): Observable<HttpResponse<any>> {
    let params= new HttpParams();
    console.log(typeof(userData))
    params = userData;
    let headers = new HttpHeaders().set('Content-Type', 'APPLICATION/json');
    const url = environment.apiUrl+'/users';
    return this.http.post<any>(url, userData, { observe: 'response',params : userData, headers: headers });
  }
  //*******UPDATE USER DETAILS BLOCK************
  public updateUser(userData) {
    let params= new HttpParams();
    console.log(userData);
    console.log(typeof(userData))
    params = userData;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = environment.apiUrl+'/users'+'/'+userData.id;
    console.log(url)
    return this.http.put<any>(url, userData, { observe: 'response',params : userData, headers: headers });
  }
  //******** DELETING THE USER BLOCK
  public deleteUser(userID){
    let params= new HttpParams();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = environment.apiUrl+'/users'+'/'+userID;
    console.log(url)
    return this.http.delete<any>(url, { observe: 'response', headers: headers });
  }
  
}
