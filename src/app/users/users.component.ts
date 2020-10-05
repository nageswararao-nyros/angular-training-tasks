import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router'
import { UsersService } from '../service/users.service';
import { FormBuilder,FormGroup,FormControl, AbstractControl,Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import { CustomValidatorService } from '../service/custom-validator.service';
import { User} from '../models/user';
import { Subscription} from 'rxjs';
import { NgxSpinnerService} from "ngx-spinner";
import { MessageService } from 'primeng/api';
declare var $: any
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
	providers: [MessageService]
})
export class UsersComponent implements OnInit,OnDestroy {
	firstname : string ="";
	lastName : string = "";
	email: string = "";
	mobile : string ="";
	paginationConfig : any;
	selectedUser :User;
	/* INJECTING  THE REQUIRED SERVICES*/
	constructor(private formBuilder : FormBuilder,
		private userService : UsersService,
		private validatorService : CustomValidatorService,private router: Router,
		private activeRoute : ActivatedRoute,private spinnerService : NgxSpinnerService,
		private messageService : MessageService) {}
	users :User[] = [];
	// successMessage ="";
	subscriber : Subscription;
	ngOnInit() {		
		/*retrieving Query Params*/
		this.subscriber = this.activeRoute.queryParams.subscribe((response) =>{
			if(response.action)
			{
				if(response.action == "Edit"){
					// this.successMessage = "User Updated Successfully"
					this.messageService.add({severity : 'success',summary:'User Updated Successfully'})
				}
				else{
					// this.successMessage ="User Added Successfully"
					this.messageService.add({severity : 'success',summary:'User Added Successfully'})
				}
			}
			// else{
				// 	// this.successMessage = "";
				// }
				this.getUsers();
			})
		this.paginationConfig = {
			itemsPerPage: 5,
			currentPage: 1,
			totalItems: this.users.length
		};
	}
	/*THIS FUNCTION IS USED TO GET USERS INFORMATION AND SHOWING IN TABLE*/
	getUsers(){
		this.spinnerService.show();
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
			this.spinnerService.hide()
		})
	}
	// THIS FUNCTION IS USED TO NAVIGAE ADD EDIT USER COMPONENT
	// 0 INDICATES IT IS FOR ADD USER
	addUser() {
		this.router.navigate(['/users/edit',0]);
	}
	/*THIS FUNCTION IS USED TO NAVIGAE ADD EDIT USER COMPONENT AND PASSING ID FOR EDIT USER*/
	editUser(user) {
		this.router.navigate(["/users/edit",user.id]);
	}
	/*THIS FUNCTION IS USED TO DELETE THE USER BASED ON ID AND UPDATING USERS INFO*/
	deleteUser(user) {
		this.spinnerService.show()
		this.userService.deleteUser(user.id).subscribe((response : any) => {
			console.log(response);
			if(response.status===200){
				this.spinnerService.hide()
				console.log("deleted");
				this.messageService.add({severity : 'success',summary:'User deleted Successfully'})
				this.getUsers();
			}
		})
	}
	/*THIS FUNCTION IS USED TO NAVIGATE TO USER-DETAIL COMPONENT*/
	viewUser() {
		this.router.navigate(['/users',this.selectedUser.id]);
	}
	pageChanged(event){
		this.paginationConfig.currentPage = event;
	}
	/* THIS FUNCTION IS USED TO UNSUBSCRIBE THE SUBSCRIBER*/
	ngOnDestroy() {
		this.subscriber.unsubscribe();
	}

}
