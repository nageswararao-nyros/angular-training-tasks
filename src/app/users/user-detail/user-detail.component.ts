import { Component, OnInit,ElementRef,OnDestroy } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { UsersService} from '../../service/users.service';
import { Subscription} from 'rxjs';
import { User } from '../../models/user'
declare var $: any
@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit,OnDestroy{
	userId: number;
	subscriber : Subscription;
	user : User;
	constructor(private router : Router,private activatedRoute : ActivatedRoute,
		private userService: UsersService) { }
	ngOnInit(): void {
		/* RETRIEVING THE USER ID THROUGH ROUTE*/
		this.subscriber = this.activatedRoute.params.subscribe((params: Params) =>{
			this.userId =  params.id;
		});
		$("#myModal").modal('show');
		this.getUser();
	};
	/* THIS METHOD IS USED TO GET DATA BASED ON USER ID*/
	getUser(){
		let data = this.userId;
		this.userService.getUser(data).subscribe(response =>{
			if(response.status === 200){
				this.user = response.body;
				console.log(response)
				console.log(this.user);
			}
		})
	}
	/* THIS METHOD IS USED TO HIDE THE MODAL AND NAVIGATE TO USERS COMPONENT*/
	onCancle() {
		this.router.navigate(['../users']);
		$("#myModal").modal('hide');
	}
	/* THIS METHOD IS USED TO UNSUBSCRIBE THE SUBSCRIPTION*/
	ngOnDestroy() {
		this.subscriber.unsubscribe();
	}


}
