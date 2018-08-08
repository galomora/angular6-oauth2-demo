import { Injectable } from '@angular/core';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';



import { OauthClientConfig } from './oauth.client.config';
import { ErrorManagerService } from './error.manager.service';



@Injectable()
export default class LoginService {

  static AUTHENTICATION_URL = 'http://localhost:8080/auth/realms/master/protocol/openid-connect/auth';
  


  constructor(private http: Http,
    private errorManagerService: ErrorManagerService
    ) { }

  private createAuthenticationParams(clientConfig: OauthClientConfig): String {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('client_id', clientConfig.resource);
    urlSearchParams.append('redirect_uri', 'http://localhost:4200/menu');
    urlSearchParams.append('state', 'mystate');
    urlSearchParams.append('scope', 'openid');
    urlSearchParams.append('response_type', 'code');
    return urlSearchParams.toString();
  }

  generateLoginURL(clientConfig: OauthClientConfig): string {
    return LoginService.AUTHENTICATION_URL + '?' + this.createAuthenticationParams(clientConfig);
  }

}
