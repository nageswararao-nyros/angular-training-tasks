import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { UsersService } from '../../service/users.service';
import { CustomValidatorService } from '../../service/custom-validator.service';
import { User} from '../../models/user';
import { Subscription} from 'rxjs'
declare var $: any
@Component({
	selector: 'app-add-edit-user',
	templateUrl: './add-edit-user.component.html',
	styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit,OnDestroy {
	userProfileForm :  FormGroup;
	user : User = new User();
	checkValidation : boolean = false;
	isFromEditMode : boolean =  false;
	headerName : string = "Add User";
	buttonName : string ="Save";
	subscriber : Subscription;
	userId: number;
	constructor(private formBuilder : FormBuilder,
		private userService : UsersService,
		private validatorService : CustomValidatorService,private router: Router,
		private activeRoute : ActivatedRoute) {
		/* INITILIZING  USER PROFILE FORM USING FORMBUILDER*/
		this.userProfileForm = this.formBuilder.group({
			id:new FormControl(""),
			firstName: new FormControl("",Validators.required),
			lastName: new FormControl("",Validators.required),
			email: new FormControl("",[Validators.required,Validators.email]),

			password : new FormControl("",Validators.compose([Validators.required,
				this.validatorService.patternValidator()])),

			confirmPassword : new FormControl("",Validators.compose([Validators.required,
				this.validatorService.patternValidator()])),

			phoneNumber : new FormControl("",
				[Validators.required,
				Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
		},
		{
			validator: this.validatorService.MatchPassword('password', 'confirmPassword'),
		});
	}
	ngOnInit() {
		// RETRIEVING THE USER ID FROM THE PARENT ROUTE IN THIS CASE USERS
		this.subscriber = this.activeRoute.params.subscribe((params: Params) =>{
			const id =  params.id;
			this.getUser(id);
		});
		$("#userModal").modal('show');
	}
	/* THIS FUNCTION IS USED TO GET USER INFO BASED ON ID*/
	/* ID ===0 INDICATES FOR ADD USER MODE */
	/* ELSE EDIT MODE*/
	getUser(id) {
		if(id == 0){
			this.buttonName = "Save";
			this.headerName = "Add User"
			this.isFromEditMode = false;
			this.userProfileForm.reset();
		}
		else {
			this.isFromEditMode = true;
			this.buttonName = "Update";
			this.headerName = "Edit User"
			this.userService.getUser(id).subscribe((response: any) =>{
				console.log(response);
				if(response.status == 200){
					this.user = response.body;
				}
			},err =>{
				console.log(err)
			});
		}
	}
	/* THIS FUNCTION IS USED FOR SUBMITTING THE DATA [EITHER SAVE OR UPDATE]*/
	/* CALLING USERSERVICE TO ADD EDIT DATA IN JSON FILE*/
	onSubmit() {
		this.checkValidations();
		console.log(this.userProfileForm)
		if(this.isFromEditMode == true)  {
			/*EDITING THE USER  */
			if(this.checkValidation!=true){
				let userData = this.user;
				this.userService.updateUser(userData).subscribe((response:any)=>{
					if(response.status===200){
						this.userProfileForm.reset();
						console.log("success");
						// this.userService.getUsers();
						this.router.navigate(['users'],{queryParams : { action : "Edit"}})
						$("#userModal").modal('hide');
					}
				},err =>{
					console.log(err)
				})
			}
		}
		/* ADDING USER IN JSON FILE*/
		else{
			if(this.checkValidation!=true){
				let userData = this.userProfileForm.value;
				this.userService.addUser(userData).subscribe((response:any)=>{
					if(response.status===201){
						this.userProfileForm.reset();
						console.log("success");
						// this.userService.getUsers();
						this.router.navigate(['users'],{ queryParams : { action : "Add"}})
						$("#userModal").modal('hide');
						// this.router.navigate(['/users'])
					}
				},err =>{
					console.log(err)
				})
			} 
		}
	}
	/* THIS FUNCTION IS USED TO CHECK ALL THE INPUT FIELDS OF USER OR VALID*/
	checkValidations() {
		if((this.userProfileForm.controls['firstName'].status=='INVALID'||
			this.userProfileForm.controls['lastName'].status=='INVALID' ||
			this.userProfileForm.controls['email'].status=='INVALID' ||
			this.userProfileForm.controls['password'].status=='INVALID' ||
			this.userProfileForm.controls['confirmPassword'].status=='INVALID' ||
			this.userProfileForm.controls['phoneNumber'].status=='INVALID')
			|| (this.userProfileForm.controls['password'].value != 
				this.userProfileForm.controls['confirmPassword'].value))
		{ 
			this.checkValidation = true;
		}
		else{
			this.checkValidation = false;
		}
	}
	/* THIS FUNCTION IS USED TO NAVIGATE TO PARENT ROUTE HERE USERS COMPONENT*/
	/* ON CLICKING CANCEL BUTTON*/
	onCancle() {
		console.log("cancle")
		this.router.navigate(['/users']);
		$("#userModal").modal('hide');
	}
	/* THIS FUNCTION IS USED TO UNSUBSCRIBE THE SUBSCRIPTION*/
	ngOnDestroy() {
		this.subscriber.unsubscribe();
	}
}
