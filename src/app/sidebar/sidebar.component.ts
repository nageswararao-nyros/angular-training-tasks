import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnChanges {
	@Input() showSideBar
	@Output() hideSidebar = new EventEmitter<boolean>();
	// visibleSidebar1; 
	constructor() { }

	ngOnInit(): void {
		
	}
	ngOnChanges() {
		 console.log(this.showSideBar)
	}
	closeSidebar() {
		// this.showSideBar = false
		console.log(this.showSideBar)
		this.hideSidebar.emit(false)
	}

}
