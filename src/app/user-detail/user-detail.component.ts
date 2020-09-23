import { Component, OnInit,ElementRef,OnDestroy } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { UsersService} from '../users.service'
declare var $: any
@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
	userId: any;
	subscriber : any;
	user : any;
	constructor(private router : Router,private activatedRoute : ActivatedRoute,
		private userService: UsersService) { }

	ngOnInit(): void {
		this.subscriber = this.activatedRoute.params.subscribe((params: Params) =>{
			this.userId =  params.id;
		});

		$("#myModal").modal('show');
		this.getUser();
	};
	getUser(){
		let data = this.userId;
		this.userService.getUser(data).subscribe(response =>{
			if(response.status === 200){
				this.user = response.body;
				console.log(this.user);
			}
		})
	}
	onCancle() {
		this.router.navigate(['../users']);
		$("#myModal").modal('hide');
	}


}
