import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AddItemComponent } from '../../components/add-item/add-item.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ LoginService ]
})
export class NavBarComponent implements OnInit {

  private loggedIn : boolean;
  //private loggedOut : boolean;

  constructor (
    private loginService : LoginService, 
    private router : Router) { 
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

  logout() {
    this.loginService.logout().subscribe (
      res => {
        console.log("logout: "+ JSON.stringify(res) );
        localStorage.removeItem('xAuthToken');
        localStorage.removeItem('credentials');
      },
      error => {
        console.log("logout error: "+ JSON.stringify(error));
      }
    );
    this.router.navigate(['/']);
  }

}
