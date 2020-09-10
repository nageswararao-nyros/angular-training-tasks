import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, AbstractControl,Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import { UsersService } from './users.service';
import { CustomValidatorService } from './custom-validator.service'

declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  userProfileForm : any;
  isFromEditMode : boolean = false;
  firstname ="";
  lastName = "";
  email = "";
  mobile="";
  buttonName = 'Save';
  checkValidation=false;
  isPasswordMatched : boolean;
  confirmValidationMessage : any;
  constructor(private formBuilder : FormBuilder,
    private userService : UsersService,
    private validatorService : CustomValidatorService) {
    this.userProfileForm = this.formBuilder.group({
      id:new FormControl("1"),
      firstName: new FormControl("",Validators.required),
      lastName: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required,Validators.email]),

      password : new FormControl("",Validators.compose([Validators.required,
        this.validatorService.patternValidator()])),

      confirmPassword : new FormControl("",Validators.compose([Validators.required,
        this.validatorService.patternValidator()])),

      phoneNumber : new FormControl("",
        [Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    },
    {
      validator: this.validatorService.MatchPassword('password', 'confirmPassword'),
    });

  }
  title = 'Angular-Training';
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
    this.checkValidations();
    // this.checkValidation = true;
    if(this.userProfileForm.controls['password'].value == 
      this.userProfileForm.controls['confirmPassword'].value)
    {
      this.isPasswordMatched = true; 
    }

    console.log(this.userProfileForm)
    if(this.isFromEditMode == true)  {
      if(this.checkValidation!=true){
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
    }
    console.log(this.userProfileForm.value);
    if(this.checkValidation!=true){
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
    
    this.isPasswordMatched = false; 
    // this.isFromEditMode = false;
    // this.checkValidation = false;
  }
  AddUser() {
    this.userProfileForm.reset();
    this.buttonName="Save"
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
  checkValidations() {
    if((this.userProfileForm.controls['firstName'].status=='INVALID'||
      this.userProfileForm.controls['lastName'].status=='INVALID' ||
      this.userProfileForm.controls['email'].status=='INVALID' ||
      this.userProfileForm.controls['password'].status=='INVALID' ||
      this.userProfileForm.controls['confirmPassword'].status=='INVALID' ||
      this.userProfileForm.controls['phoneNumber'].status=='INVALID')
      || (this.userProfileForm.controls['password'].value != 
        this.userProfileForm.controls['confirmPassword'].value))
    { 
      this.checkValidation = true;
    }
    else{
      this.checkValidation = false;
    }
  }


}



