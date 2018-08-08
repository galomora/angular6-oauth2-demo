import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms'; //  NgModel lives here
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SimpleNotificationsModule } from 'angular2-notifications';



import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { RoutingModule } from './routing.module';
import { ErrorManagerService } from './error.manager.service';
import LoginService from './login.service';
import { PrincipalMenuComponent } from './principal-menu.component';


@NgModule({
  declarations: [
    RootComponent,
    AppComponent,
    PrincipalMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [ErrorManagerService, LoginService],
  bootstrap: [RootComponent]
})
export class AppModule { }
