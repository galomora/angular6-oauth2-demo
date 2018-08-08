import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { OauthClientConfig } from './oauth.client.config';
import { ConfigLoaderService } from './config.loader.service';
import { UserInfoService } from './user-info.service';
import { Observable, from } from 'rxjs';
import { GreetingService } from './greeting.service';
import * as jwt from 'jsonwebtoken';



@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrls: ['./principal-menu.component.css']
})
export class PrincipalMenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private authorizationService: AuthorizationService,
    private configLoaderService: ConfigLoaderService,
    private userInfoService: UserInfoService,
    private greetingService: GreetingService) { }

  state: string;
  sessionState: string;
  code: string;
  oauthClientConfig: OauthClientConfig;
  username: string;
  authorizedToken: string;
  greetingValue: string;

  ngOnInit() {
    console.log('init menu ');
    this.state = this.route.snapshot.queryParams['state'];
    this.sessionState = this.route.snapshot.queryParams['session_state'];
    this.code = this.route.snapshot.queryParams['code'];
    if (this.code === undefined) { return; }
    this.configLoaderService.getAppConfig().subscribe(config => {
      this.oauthClientConfig = config;
      this.authorizationService.obtainTokenObservable (this.code, config).subscribe(
        tokenResponse => {
          console.log('el token devuelto' + tokenResponse.target.response);
          let tokenJSON : any = JSON.parse(tokenResponse.target.response);
          this.getIdToken(tokenJSON['id_token']);
          let accessToken = tokenJSON['access_token'];
          this.authorizedToken = tokenJSON['access_token'];
          console.log ('access token ' + accessToken);
          this.loadUserInfo(accessToken);
        }
      );
    });
  }

  private loadUserInfo (accessToken: string) {
    this.userInfoService.getUserInfoObservable(accessToken).subscribe(
      userInfo => {
        let userInfoJSON = JSON.parse(userInfo.target.response);
        this.username = userInfoJSON['name'];
      }
    );
  }

  public getGreeting () {
    console.log('invocando greeting ws');
    this.greetingService.getGreetingObservable(this.authorizedToken).subscribe(
      greetingResponse => {
        this.greetingValue = JSON.parse(greetingResponse.target.response);
      }
    );
  }

  public getGreetingAngular () {
    console.log('invocando greeting ws');
    this.greetingService.getGreetingAngular(this.authorizedToken).subscribe(
      greetingResponse => {
        this.greetingValue = JSON.stringify(greetingResponse);
      }
    );
  }

  private getIdToken (idToken : string) {
    // let nodeJose : NodeJose = new NodeJose();
    console.log('token antes ' + JSON.stringify(idToken) );
    const decoded = jwt.decode(idToken);
    console.log('nombre en token ' + decoded['name']);
    console.log('token despues ' + JSON.stringify (decoded));
  }

}
