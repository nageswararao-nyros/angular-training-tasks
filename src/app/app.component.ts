import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, AbstractControl,Validators, ValidatorFn, ValidationErrors, Validator} from '@angular/forms';
import { UsersService } from './users.service';

declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  userProfileForm : FormGroup;
  isFromEditMode : boolean = false;
  firstname ="";
  lastName = "";
  email = "";
  mobile="";
  buttonName = 'Save'
  constructor(private userService : UsersService) {
    this.userProfileForm = new FormGroup({
    id:new FormControl(null),
    firstName: new FormControl("",Validators.required),
    lastName: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",
       [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    confirmPassword : new FormControl("",[Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    phoneNumber : new FormControl("",
       [Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    },{validators:this.passwordErrorValidator});
   
  }
  title = 'Angular-Training';
  users :any;
  ngOnInit() {
    $("#userModal").modal('hide');
    this.getUsers();
  }

  passwordErrorValidator(c: AbstractControl) : ValidationErrors | null {
    if(c.get('password').value !== c.get('confirmPassword').value){
      c.get('confirmPassword').setErrors({invalid:true});
      return {invalid : true} 
    } 
    return null;
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
    if(this.isFromEditMode == true) {
      let userData = this.userProfileForm.value;
      this.userService.updateUser(userData).subscribe((response:any)=>{
        if(response.status===200){
        this.userProfileForm.reset();
        console.log("success");
        this.getUsers();
        $("#userModal").modal('hide');
        }
      },err =>{
      console.log(err)
      })

    }
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

  editUser(user) {
    console.log(user);
    this.isFromEditMode = true;
    this.buttonName= "Update";
    $("#userModal").modal('show');
    this.userProfileForm.controls.firstName.setValue(user.firstName);
    this.userProfileForm.controls.lastName.setValue(user.lastName);
    this.userProfileForm.controls.email.setValue(user.email);
    this.userProfileForm.controls.password.setValue(user.password);
    this.userProfileForm.controls.confirmPassword.setValue(user.confirmPassword);
    this.userProfileForm.controls.phoneNumber.setValue(user.phoneNumber);
    this.userProfileForm.controls.id.setValue(user.id)
  }
  DeleteUser(user) {
    
    this.userService.deleteUser(user.id).subscribe((response : any) => {
      console.log(response);
      if(response.status===200){
        console.log("deleted");
        this.getUsers();
      }
    })

  }
}
