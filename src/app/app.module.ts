import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
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
import { DashboardComponent } from './dashboard/dashboard.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { NgxPaginationModule } from 'ngx-pagination';
import { HighchartsChartModule } from 'highcharts-angular';
import {SidebarModule} from 'primeng/sidebar';
import { ChartsComponent } from './charts/charts.component';
import { LightboxModule } from 'primeng/lightbox';    
import { TooltipModule } from 'primeng/tooltip'; 
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from './sidebar/sidebar.component'; 

import { SocialLoginModule,SocialAuthServiceConfig,GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// const config = new AuthServiceConfig([
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('YOUR-APP-ID')
//   }
// ]);

// export function provideConfig() {
//   return config;
// }
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
  DashboardComponent,
  ChartsComponent,
  SidebarComponent
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
  NgxSpinnerModule,
  ToastModule,
  CalendarModule,
  NgxPaginationModule,
  HighchartsChartModule,
  SidebarModule,
  LightboxModule,TooltipModule,
  ButtonModule,
  SocialLoginModule
  ],
  providers: [UsersService,CustomValidatorService,Authguard,AuthService,
   {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '171674796309-uu4fppaia5k81umdb7935qrrojg8e3d6.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('494382171519782'),
          }
        ],
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
