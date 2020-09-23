import { Injectable } from '@angular/core';
import { HttpClient,HttpParams ,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	URL:string ='http://localhost:3000';
	constructor(private http : HttpClient) {}
    public checkUser(email) : any {
    	const url = this.URL+'/users?email='+email;
		return this.http.get<any>(url);  
    }
	public login(email,password) :any {
		const url = this.URL+'/users?email='+email+'&password='+password;
		return this.http.get<any>(url);  
	}
	public logout(){
		localStorage.removeItem("user")
	}

}
