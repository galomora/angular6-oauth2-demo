import { Injectable } from '@angular/core';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { OauthClientConfig } from './oauth.client.config';
import { ErrorManagerService } from './error.manager.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigLoaderService {

  constructor(private http: Http, private errorManagerService: ErrorManagerService) { }

    getAppConfig(): Observable<OauthClientConfig> {
        return this.http.get('assets/keycloak.json').pipe(
            map(response => this.mapConfig(response))).pipe(catchError(this.errorManagerService.handleErrorObservable));
    }

    private mapConfig(response): OauthClientConfig {
        let config: OauthClientConfig = new OauthClientConfig();
        let jsonResponse = response.json();
        // obtener config de aplicacion box
        config.realm = jsonResponse['realm'];
        config.authServerUrl = jsonResponse['auth-server-url'];
        config.sslRequired = jsonResponse['ssl-required'];
        config.resource = jsonResponse['resource'];
        config.credentials = jsonResponse['credentials'];
        config.confidentialPort = jsonResponse['confidential-port'];
        return config;
    }
}
