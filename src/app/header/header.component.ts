import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../service/auth.service'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    showSignout :boolean;
	constructor(private router : Router,private authService : AuthService) { }
	ngOnInit(): void {
		/* checking if local storage contains user which indicates user logged in*/
		/* then showing signout button */
		if(localStorage.getItem("user")){
			this.showSignout = true;
		}
	}
	/*This function is used to Logout the user*/
	onSignOut() {
		console.log("logout")
		// localStorage.removeItem("user");
		this.authService.logout();
		this.router.navigate(["/login"]);
	}

}
