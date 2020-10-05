import { Component, OnInit ,Input, Output,EventEmitter,OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SocialAuthService,SocialUser } from "angularx-social-login";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges{
	showSignout :boolean;
	buttonClicked : boolean;
	@Input() hideSideBar 
	@Output() isSideNavSelected = new EventEmitter<boolean>();
	clicked : any;
	constructor(private router : Router,private authService : AuthService,private socialAuthService : SocialAuthService) { }
	ngOnInit(): void {
		// console.log(this.showSideBar)
		/* checking if local storage contains user which indicates user logged in*/
		/* then showing signout button */
		if(localStorage.getItem("user")){
			this.showSignout = true;
		}
	}
	/*This function is used to Logout the user*/
	onSignOut() {
		console.log("logout")
		localStorage.removeItem("user");
		this.socialAuthService.signOut();
		this.authService.logout();

		this.router.navigate(["/login"]);
	}

	onSideNavShow(event) {
		console.log(event)
		this.clicked = event;
		this.buttonClicked = true;
		// if(this.hideSideBar == false){
			this.isSideNavSelected.emit(this.buttonClicked);
			// this.buttonClicked = false;
			// }
			// this.isSideNavSelected.emit(this.hideSideBar);
			// this.buttonClicked =  false;

		}
		ngOnChanges() {
			console.log(this.hideSideBar)
			// this.clicked.returnValue = false;
			this.buttonClicked = false;
			
		}

	}
