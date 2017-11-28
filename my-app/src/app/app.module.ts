import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { AppComponent } from './start/app.component';
import { HttpModule} from "@angular/http";

import { NavComponent } from './shared/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './shared/app.routing';

import { AdminModule }  from './admin/admin.module';





@NgModule({
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ErrorComponent

  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
