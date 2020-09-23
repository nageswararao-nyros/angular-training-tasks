import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, AbstractControl,Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router,NavigationStart} from '@angular/router'
import { UsersService } from './users.service';
import { CustomValidatorService } from './custom-validator.service';

declare var $: any
@Component({	
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent  {
	showHead = false;
	constructor(private router : Router) {
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

}



