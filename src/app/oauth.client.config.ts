
export class OauthClientConfig {
  realm : string;
  authServerUrl : string;
  sslRequired : string;
  resource : string;
  credentials : {
    secret : string;
  };
  confidentialPort: string;

  constructor () {
    this.credentials = {secret: ''};
  }
}
