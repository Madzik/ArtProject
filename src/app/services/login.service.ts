import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

export interface Token {
  token : string;
}

@Injectable()
export class LoginService {

  private loginStatus = new BehaviorSubject(true);
  currentStatus = this.loginStatus.asObservable();

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
    let xToken = localStorage.getItem('xAuthToken');
    const basicHeader = 'Basic ' + localStorage.getItem('credentials');
    const headers = new HttpHeaders({
      'Authorization' : basicHeader,
      'x-auth-token' : xToken,
    });
    return this.http.get(url, { headers : headers});
  }

  logout() {
    let url = "http://localhost:8081/user/logout";
    let headers = new HttpHeaders ({
      'x-auth-token' : localStorage.getItem("xAuthToken")
    })
    return this.http.post(url, ' ', { headers : headers});
  }

  // changeLoginStatus (status : boolean) {
  //   this.loginStatus.next(status);
  // }
  checkLoginStatus() {
    if(localStorage.getItem("xAuthToken")!= null) {
      return true;
    }
  }
}
