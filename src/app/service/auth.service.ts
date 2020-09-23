import { Injectable,OnInit } from '@angular/core';
import { HttpClient,HttpParams ,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable,timer,interval } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class AuthService  {
	constructor(private http : HttpClient) {}
	// CHECKING IF EMAIL EXIST IN THE USERS ARRAY
	public checkUser(email) : any {
		const url = environment.apiUrl+'/users?email='+email;
		return this.http.get<any>(url);  
	}
	//THIS FUNCTION IS USED TO SEND EMAIL AND PASSSWORD TO JSON SERVER FOR USER TO LOGIN
	public login(email,password) :any {
		const url = environment.apiUrl+'/users?email='+email+'&password='+password;
		return this.http.get<any>(url);  
	}
	//THIS DUNCTION  IS USED TO LOGOUT  THE USER
	public logout(){
		localStorage.removeItem("user")
	}
}
