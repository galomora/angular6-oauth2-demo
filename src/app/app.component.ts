import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

import { NotificationOptions } from './notification.options';

import LoginService from './login.service';
import { ConfigLoaderService } from './config.loader.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oauth-demo';
  loginURL: string;
  errorMessage: string;
  infoMessage: string;
  showError: boolean = false;
  linkGenerated: boolean = false;
  logoutParam: string;

  constructor(
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private loginService: LoginService,
    private configLoaderService: ConfigLoaderService
        ) {
    }

  ngOnInit(): void {
    this.showError = false;
    this.logoutParam = this.route.snapshot.queryParams['logout'];
    console.log('ptm carajo');
    if (this.logoutParam !== undefined && this.logoutParam === 'true'
  //  && this.sessionService.isLoggedIn()
  ) {
        this.closeSession();
    }
    this.generateLoginLink ();

  }

  private generateLoginLink() {
    this.configLoaderService.getAppConfig().subscribe (
      config => {
        this.loginURL = this.loginService.generateLoginURL(config);
        this.linkGenerated = true;
      }
    );
    
}
  
  closeSession() {
      
  }

  private displayError (error : any, message:string) {
      this.errorMessage = error.toString();
      this.showError = true;
      this.notificationsService.error ('Error', error.toString(), NotificationOptions.options);
      console.log(message + ' ' + error.toString());
  }

}
