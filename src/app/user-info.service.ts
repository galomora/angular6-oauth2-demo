import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  static USER_INFO_URL = 'http://localhost:8080/auth/realms/master/protocol/openid-connect/userinfo';
  constructor() { }

  public getUserInfo(authorizedToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', UserInfoService.USER_INFO_URL, true);
      request.setRequestHeader('Authorization', 'Bearer ' + authorizedToken);
      request.onload = resolve;
      request.onerror = reject;
      request.send();
    });
  }

  public getUserInfoObservable(authorizedToken: string): Observable<any> {
    return from (this.getUserInfo(authorizedToken));
  }
}
