import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {UsersService} from './users.service';
import {CustomValidatorService} from './custom-validator.service';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UsersService,CustomValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
