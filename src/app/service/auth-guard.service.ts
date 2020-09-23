import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class Authguard implements CanActivate {

	constructor(private router: Router,private authService : AuthService) { }
	/*This Function is Used to check if user is logged in 
	else Navigating to LOGIN page
		*/
	canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot) : boolean | Promise<boolean>{
		//console.log(ActivatedRouteSnapshot,RouterStateSnapshot)
		if(localStorage.getItem("user")){
			return true;
		}
		//sending current route  information sate to Login Page
		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }})
		return false;

	}
}
