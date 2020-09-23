import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router'
import { UsersService } from '../service/users.service';
import { FormBuilder,FormGroup,FormControl, AbstractControl,Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import { CustomValidatorService } from '../service/custom-validator.service';
import { User} from '../models/user';
import { Subscription} from 'rxjs';
declare var $: any
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {
	firstname : string ="";
	lastName : string = "";
	email: string = "";
	mobile : string ="";
	selectedUser :User;
	/* INJECTING  THE REQUIRED SERVICES*/
	constructor(private formBuilder : FormBuilder,
		private userService : UsersService,
		private validatorService : CustomValidatorService,private router: Router,
		private activeRoute : ActivatedRoute) {}
	users :User[] = [];
	successMessage ="";
	subscriber : Subscription;
	ngOnInit() {
		/*retrieving Query Params*/
		this.subscriber = this.activeRoute.queryParams.subscribe((response) =>{
			if(response.action)
			{
				if(response.action == "Edit"){
					this.successMessage = "User Updated Successfully"
				}
				else{
					this.successMessage ="User Added Successfully"
				}
			}
			else{
				this.successMessage = "";
			}
			this.getUsers();
		})
	}
	/*THIS FUNCTION IS USED TO GET USERS INFORMATION AND SHOWING IN TABLE*/
	getUsers(){
		this.userService.getUsers().subscribe(response => {
			console.log(response)
			if(response.status===200){
				if(response.body.length ===0){
					console.log("No Users")
				}
				else{
					this.users = response.body;
					console.log(response.body)
				}
			}
		})
	}
	// THIS FUNCTION IS USED TO NAVIGAE ADD EDIT USER COMPONENT
	// 0 INDICATES IT IS FOR ADD USER
	AddUser() {
		this.router.navigate(['/users/edit',0]);
	}
	/*THIS FUNCTION IS USED TO NAVIGAE ADD EDIT USER COMPONENT AND PASSING ID FOR EDIT USER*/
	editUser(user) {
		this.router.navigate(["/users/edit",user.id]);
	}
	/*THIS FUNCTION IS USED TO DELETE THE USER BASED ON ID AND UPDATING USERS INFO*/
	DeleteUser(user) {
		this.userService.deleteUser(user.id).subscribe((response : any) => {
			console.log(response);
			if(response.status===200){
				console.log("deleted");
				this.getUsers();
			}
		})
	}
	/*THIS FUNCTION IS USED TO NAVIGATE TO USER-DETAIL COMPONENT*/
	viewUser() {
		this.router.navigate(['/users',this.selectedUser.id]);
	}
	/* THIS FUNCTION IS USED TO UNSUBSCRIBE THE SUBSCRIBER*/
	ngOnDestroy() {
		this.subscriber.unsubscribe();
	}

}
