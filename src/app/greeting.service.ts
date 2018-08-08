import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  static GREETING_WS_URL = 'http://localhost:18080/greeting';
  constructor(private httpClient: HttpClient ) { }

  public getGreeting(authorizedToken: string): Promise<any> {
    return new Promise(() => {
      let request = new XMLHttpRequest();
      console.log('llamando a servicio con token ' + authorizedToken);
      request.open('GET', GreetingService.GREETING_WS_URL, true);
      // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.setRequestHeader('Authorization', 'Bearer ' + authorizedToken);
      request.onload = function () {
        console.log('exito ' + this.responseText);
      };
      request.onerror = function () {
        console.log('fracaso ' + this.responseText);
        console.log('fracaso ' + this.responseType);
        console.log('fracaso ' + this.responseURL);
      };
      request.send();
    });
  }

  public getGreetingObservable(authorizedToken: string): Observable<any> {
    return from (this.getGreeting(authorizedToken));
  }

  public getGreetingAngular (authorizedToken: string): Observable<any> {
    console.log('token '  + authorizedToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + authorizedToken
      })
    };
    return this.httpClient.get(GreetingService.GREETING_WS_URL);
  }

}
