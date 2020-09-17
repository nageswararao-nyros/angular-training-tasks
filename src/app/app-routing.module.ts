import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent} from './user-detail/user-detail.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { Authguard} from './auth-guard.service';
import { LoginComponent } from './login/login.component'
const appRoutes : Routes =  [
{ path : '',redirectTo : '/home',pathMatch : 'full'},
{ path : 'login',component : LoginComponent},
{ path :'home', component : HomeComponent},
{ path :'users',component : UsersComponent,canActivate : [Authguard],children :[
{
	path : ':id',component:UserDetailComponent
}
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




