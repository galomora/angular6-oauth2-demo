import { Injectable } from '@angular/core';
import { OauthClientConfig } from './oauth.client.config';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  static AUTHORIZATION_URL = 'http://localhost:8080/auth/realms/master/protocol/openid-connect/token';
  authorizedToken: string;
  constructor() { }

  public obtainToken (code: string, clientConfig: OauthClientConfig): Promise<any> {
      let params: string = this.createAuthorizationParams(code, clientConfig);
      let encodedCredentials: string = this.encodeCredentials (clientConfig.resource, clientConfig.credentials.secret);
      return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('POST', AuthorizationService.AUTHORIZATION_URL, true); // true for asynchronous
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('Authorization', 'Basic ' + encodedCredentials
        );
        request.onload = resolve;
        request.onerror = reject;
        request.send(params);
      });
  }

  private createAuthorizationParams(userToken: string, clientConfig: OauthClientConfig): string {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'authorization_code');
    urlSearchParams.append('code', userToken.toString());
    // urlSearchParams.append('client_id', clientConfig.resource);
    // urlSearchParams.append('client_secret', clientConfig.credentials.secret);
    urlSearchParams.append('redirect_uri', 'http://localhost:4200/menu');
    return urlSearchParams.toString();
  }

  private encodeCredentials (clientId: string, secret: string): string {
    const toEncode = clientId + ':' + secret;
    return btoa(toEncode);
  }

  public obtainTokenObservable(code: string, clientConfig: OauthClientConfig): Observable<any> {
    return from (this.obtainToken(code, clientConfig));
  }

}
