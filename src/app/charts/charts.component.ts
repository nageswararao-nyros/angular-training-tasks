import { Component, OnInit } from '@angular/core';
import { UsersService} from '../service/users.service'
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
	selector: 'app-charts',
	templateUrl: './charts.component.html',
	styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
	highcharts = Highcharts;
	chartOptions : any;
	selectedChart : any;
	indianVisitors = [];
	foreignVisitors = [];
	indianPieValue : any;
	foreignPieValue : any;
	constructor(private userService : UsersService,private spinnerService : NgxSpinnerService) { }

	ngOnInit(): void {
		this.getTravelData('column');
	}
	getTravelData(chartType) {
		this.selectedChart = chartType;
		this.spinnerService.show()
		this.userService.getTravelData().subscribe(response => {
			if(response.status===200){
				this.spinnerService.hide()
				console.log(response)
				if(response.body.data[0].place === "India"){
					this.indianVisitors = response.body.data[0].VisitorsByMonth;
					this.indianPieValue = this.indianVisitors.reduce((prev, curr) => prev + curr, 0);
				}
				if(response.body.data[1].place === "USA"){
					this.foreignVisitors =response.body.data[1].VisitorsByMonth;
					this.foreignPieValue = this.foreignVisitors.reduce((prev, curr) => prev + curr, 0);
				}
				if(chartType == 'pie') {
					this.chartOptions = {};
					// this.chartOptions.series = [];
					this.chartOptions = {
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: chartType
						},
						title: {
							text: 'World Tourists'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
							// getFillFromObject : false,
						},
						accessibility: {
							point: {
								valueSuffix: '%'
							}
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %'
								}
							}
						},
						series: [{
							 name: 'Visitors',
							 // colorByPoint: true,
							data: [{
								name: 'India',
								y: this.indianPieValue,
								sliced: true,
								// selected: true
							},
							{
								name: 'Foreign',
								y: this.foreignPieValue
								// sliced: true,
								// selected: true
							}
							]
						}]
					}
				}
				else{

					this.chartOptions = {  
						chart: {  
							type: chartType,  
							// height: 500  
						},  
						title: {  
							text: 'World Tourists'  
						},  

						xAxis: {  
							categories: response.body.categories,
							// crosshair: true  
						}, 
						yAxis : {
							min: 0,
							title: {
								text: 'Visitors (in millions)'         
							}      
						}, 
						tooltip : {
							headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
							'<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
						},
						plotOptions : {
							series: {
								dataLabels: {
									enabled: true,
									allowOverlap: true
								}
							},
							column: {
								pointPadding: 0.2,
								borderWidth: 0
							}
						},
						series: [  
						{  
							name: 'India',  
							color : 'green',
							data:  this.indianVisitors
						},  
						{  
							name: 'USA',  
							color:'pink',
							data: this.foreignVisitors 
						}  
						]  
						// series : this.getData(chartType,this.indianVisitors,this.foreignVisitors)
					}  

				}
				console.log(this.chartOptions)
				
			}

		})
	}	

	
}

