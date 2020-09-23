import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module'
import {UsersService} from './service/users.service';
import {CustomValidatorService} from './service/custom-validator.service';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { SearchFilterPipe } from './filters/search-filter.pipe'
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { Authguard } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [
  AppComponent,
  SearchFilterPipe,
  HomeComponent,
  UsersComponent,
  HeaderComponent,
  PageNotFoundComponent,
  UserDetailComponent,
  LoginComponent,
  AddEditUserComponent,
  ],
  imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule
  ],
  providers: [UsersService,CustomValidatorService,Authguard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
