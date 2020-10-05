import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, AbstractControl,Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router,NavigationStart} from '@angular/router'
import { UsersService } from './service/users.service';
import { CustomValidatorService } from './service/custom-validator.service';

declare var $: any
@Component({	
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {

	title : string = "Angular Training"
	showHead : boolean = false;
	showSideMenuItem : any
	constructor(private router : Router) {
		/* HIDING NAVBAR IN LOGIN PAGE*/
		this.router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				if(event['url']=='/login' || event['url'].includes('/login')){
					this.showHead = false;
				}
				else {
					this.showHead = true;
				}
			}
		})

	}
	ngOnInit() {

	}
	showSideMenu(event) {
		console.log(event)
		this.showSideMenuItem = event;
	}
	hideSideMenu(event) {
		console.log(event)
		this.showSideMenuItem = event;
	}
}



