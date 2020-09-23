import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router'
import {CustomValidatorService} from '../service/custom-validator.service';
import { AuthService} from '../service/auth.service'
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
	/*INJECTING  THE REQUIRED SERVICES*/
	constructor(private validatorService: CustomValidatorService,private authService: AuthService,
		private router : Router, private activeRoute :ActivatedRoute) { }
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
						/* CALLING AUTH SERVICE TO LOGIN UUSER*/
						this.authService.login(this.loginForm.controls['email'].value,
							this.loginForm.controls['password'].value).
						subscribe(response =>{
							localStorage.setItem("user",response[0].id);
							this.router.navigate([this.returnUrl]);
						})
					}
					else{
						this.errorMessage = "User name and password not match"
					}
				}
				else{
					this.errorMessage = "User Does Not Exist"
				}
			})
		}
		this.errorMessage = "";	
	}
}
