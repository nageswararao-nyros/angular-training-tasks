import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    showSignout :boolean;
	constructor(private router : Router) { }

	ngOnInit(): void {
		if(localStorage.getItem("user")){
			this.showSignout = true;
		}
	}
	onSignOut() {
		console.log("logout")
		localStorage.removeItem("user");
		this.router.navigate(["/login"]);
	}

}
