import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface Token {
  token : string;
}

@Injectable()
export class LoginService {

  constructor( private http: HttpClient ) { }

  sendCredentials ( login : string, password : string) : Observable <Token> {
    let url = "http://localhost:8081/token";
    let encodedCredentials = btoa(login + ":" + password);
    let basicHeader = "Basic " + encodedCredentials;
    let headers = new HttpHeaders ({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
    });
    return this.http.get<Token>(url, {headers : headers});
  }

  checkSession () {
    let url = "http://localhost:8081/checkSession";
    let headers = new HttpHeaders ( {
      'x-auth-token' : localStorage.getItem("xAuthToken")
    })
    return this.http.get(url, { headers : headers});
  }

  logout() {
    let url = "http://localhost:8081/user/logout";
    let headers = new HttpHeaders ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    })
    return this.http.post(url, ' ', { headers : headers});
  }
}
