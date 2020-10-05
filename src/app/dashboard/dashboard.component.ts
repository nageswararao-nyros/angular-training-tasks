import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../service/users.service'
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	highcharts = Highcharts;
	male: number;
	female: number;
	chartOptions : any;
	// series : any
	constructor( private userService : UsersService,private spinnerService : NgxSpinnerService) { }

	ngOnInit(): void {
		this.getUsers();
	}
	getUsers(){
		this.spinnerService.show();
		this.userService.getUsers().subscribe(response => {
			console.log(response)
			if(response.status===200){
				if(response.body.length ===0){
					console.log("No Users")
				}
				else{
					this.male = (response.body.filter(user => user.gender === 'male')).length;
					this.female = (response.body.filter(user => user.gender === 'female')).length;
					this.chartOptions = {   
						chart : {
							plotBorderWidth: null,
							plotShadow: false
						},
						title : {
							text: 'Users data by Genderwise'   
						},
						tooltip : {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						},
						plotOptions : {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',

								dataLabels: {
									enabled: false           
								},

								showInLegend: true
							}
						},
						series : [{
							type: 'pie',
							name: 'users share',
							data: [
							['male',   this.male],
							['female', this.female],
							]
						}]
					};
				}
			}
			this.spinnerService.hide()
		})
		console.log(this.male + " " + this.female)
	}



}
