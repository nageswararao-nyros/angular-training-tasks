import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(users :any[],searchByFirstName :string,searchByLastName : string,searchByEmail: string,
  	searchByPhone : number) {

    if(users && users.length){
      return users.filter(user  =>{
        if(searchByFirstName &&  user.firstName.toLowerCase().indexOf(searchByFirstName.toLowerCase())===-1){
          return false;
        }
        if(searchByLastName &&  user.lastName.toLowerCase().indexOf(searchByLastName.toLowerCase())===-1){
          return false;
        }
         if(searchByEmail &&  user.email.toLowerCase().indexOf(searchByEmail.toLowerCase())===-1){
          return false;
        }
        // if(searchByPhone &&  user.phoneNumber.indexOf(searchByPhone)===-1){
        //   return false;
        // }

        

        return true;
      })
    }
    else{
      return users;
    }
  }

}
