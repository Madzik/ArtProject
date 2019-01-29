import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginGroup : FormGroup;
  private credentials : { 'login': '', 'password': ''};
  private loggedIn : boolean;

  constructor ( 
    private fb: FormBuilder, 
    private loginService : LoginService, 
    private router : Router){
    this.loginGroup = this.fb.group ({
      'login' : new FormControl('', Validators.required),
      'password' : new FormControl ('', Validators.required)
    });
  } 

  ngOnInit() {
    // this.loginService.checkSession().subscribe (
    //   res => {
    //     this.loggedIn = true;
    //   },
    //   error => {
    //     this.loggedIn = false;
    //   }
    // );
  this.loggedIn = this.loginService.checkLoginStatus();
 }
  get login() {
    return this.loginGroup.get('login');
  }
  get password() {
    return this.loginGroup.get('password');
  }
 
  onSubmit (FormGroup : any) {
    const inputValue = this.loginGroup.value;

    this.loginService.sendCredentials(inputValue.login, inputValue.password).subscribe(

      res => {
        console.log(res.token);
        localStorage.setItem("xAuthToken", res.token );
        this.loggedIn = true;
        const credentials = btoa(inputValue.login + '' + inputValue.password);
        localStorage.setItem('credentials', credentials);
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
}
