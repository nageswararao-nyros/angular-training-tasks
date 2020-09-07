import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl, Validators} from '@angular/forms';
import { UsersService } from './users.service';

declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private userService : UsersService) {

  }
  title = 'Angular-Training';

  userProfileForm = new FormGroup({

    firstName: new FormControl("",Validators.required),
    lastName: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",
       [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    phoneNumber : new FormControl("",
       [Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });
  users :any;
  ngOnInit() {

    $("#userModal").modal('hide');
    this.getUsers();

  }
  getUsers(){
    this.userService.getUsers().subscribe(response =>{
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
  onSubmit() {
    console.log(this.userProfileForm.value);
    let userData = this.userProfileForm.value;
    this.userService.addUser(userData).subscribe((response:any)=>{
      if(response.status===201){
        this.userProfileForm.reset();
        console.log("success");
        this.getUsers();
        $("#userModal").modal('hide');
      }


    },err =>{
      console.log(err)
    })
  }
  AddUser() {
    this.userProfileForm.reset();
    $("#userModal").modal('show');


  }
}
