import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root'
})
export class Authguard implements CanActivate {

	constructor(private router: Router,private authService : AuthService) { }
	canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot) : boolean | Promise<boolean>{
		console.log(ActivatedRouteSnapshot,RouterStateSnapshot)
		if(localStorage.getItem("user")){
			return true;
		}
		
		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }})
		return false;

	}
}
