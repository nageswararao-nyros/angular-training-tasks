import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router'
import {CustomValidatorService} from '../service/custom-validator.service';
import { AuthService} from '../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm : FormGroup;
	checkValidation:boolean = false;
	errorMessage:string = "";
	returnUrl:string = "";
	user: SocialUser;
	/*INJECTING  THE REQUIRED SERVICES*/
	constructor(private validatorService: CustomValidatorService,private authService: AuthService,
		private router : Router, private activeRoute :ActivatedRoute,
		private spinnerService : NgxSpinnerService,
		private socialAuthService: SocialAuthService) { }
	ngOnInit(): void {
		/* INITILAIZING LOGIN FORM USING FORMGROUP*/	
		this.loginForm = new FormGroup({
			email : new FormControl('',[Validators.required,Validators.email]),
			password : new FormControl('',Validators.required),
		})
		/* retrieving the Information about the route usinng query params */
		this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
		
	}
	// THIS FUNCTION IS USED TO USER LOGIN AND DISPLAY ERROR MESSAGES IF NOT AUTHORIZED
	onLogin() {
		this.spinnerService.show()
		//CHECKING IF USER ENTERED VALID EMAIL AND PASSWORD
		if(this.loginForm.controls['email'].status =='INVALID' ||
			this.loginForm.controls['password'].status =='INVALID')
		{
			this.checkValidation = true;
		}
		if(this.checkValidation != true){

			//CALLING AUTH SERVICE TO CHECK IF USER AUTHORIZED AND THEN REDIRECT TO RESPECTIVE ROUTE[RETURNURL]
			this.authService.checkUser(this.loginForm.controls['email'].value).subscribe(response =>{
				if(response.length >0){
					if(response[0].password === this.loginForm.controls['password'].value)
					{ 
						this.spinnerService.show()
						/* CALLING AUTH SERVICE TO LOGIN UUSER*/
						this.authService.login(this.loginForm.controls['email'].value,
							this.loginForm.controls['password'].value).
						subscribe(response =>{
							localStorage.setItem("user",response[0].id);

							this.router.navigate([this.returnUrl]);
						})
					}
					else{
						this.spinnerService.hide()
						this.errorMessage = "User name and password not match"
					}
				}
				else{
					this.spinnerService.hide()
					this.errorMessage = "User Does Not Exist"
				}
			})

		}
		this.errorMessage = "";	
	}
	loginWithAuthProvider(authType): void {
		let authID : string;
		if(authType==='facebook'){
			 authID = FacebookLoginProvider.PROVIDER_ID;
		}
		else{
			authID = GoogleLoginProvider.PROVIDER_ID;
		}
		
		this.socialAuthService.signIn(authID).then(user =>{
			console.log(user)
			if(user){
				localStorage.setItem("user",user.authToken);
				this.router.navigate([this.returnUrl]);
			}
		})
	}

	// signInWithFB(): void {
	// 	this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user =>{
	// 		// console.log(user)	
	// 		if(user){
	// 			localStorage.setItem("user",user.authToken);
	// 			this.router.navigate([this.returnUrl]);
	// 		}
	// 	})
	// }

}
