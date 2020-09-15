import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module'
import {UsersService} from './users.service';
import {CustomValidatorService} from './custom-validator.service';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { SearchFilterPipe } from './search-filter.pipe';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
  AppComponent,
  SearchFilterPipe,
  HomeComponent,
  UsersComponent,
  HeaderComponent,
  PageNotFoundComponent,
  UserDetailComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule
  ],
  providers: [UsersService,CustomValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
