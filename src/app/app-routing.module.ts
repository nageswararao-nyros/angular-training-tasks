import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent} from './users/user-detail/user-detail.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { Authguard} from './service/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AddEditUserComponent} from './users/add-edit-user/add-edit-user.component';
// Declaring Routes Array 
const appRoutes : Routes =  [
{
	path : '',
	redirectTo : '/home',
	pathMatch : 'full'
},
{ 
	path : 'login',
	component : LoginComponent
},
{ 
	path :'home',
	component : HomeComponent
},
{   
	path :'users',component : UsersComponent,canActivate : [Authguard],children :[
	{ path : ':id',component:UserDetailComponent },
	{ path :'edit/:id',component: AddEditUserComponent }
	]
},
{ path : '**',component: PageNotFoundComponent}
]
@NgModule({
	imports : [RouterModule.forRoot(appRoutes)],
	exports : [RouterModule]
}) 
export class AppRoutingModule {

}




