import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ LoginService ]
})
export class NavBarComponent implements OnInit {

  private loggedIn : boolean;

  constructor(private loginService : LoginService) { 

  }

  ngOnInit() {
    this.loginService.checkSession().subscribe (
      res => {
        console.log("nav page " +res.toString);
        this.loggedIn = true;
      },
      error => {
        console.log("nav error " +error.toString);
        this.loggedIn = false;
      }
    )
  }

  logout() {
    this.loginService.logout().subscribe (
      res => {
        //console.log("logout: "+ JSON.stringify(res) );
        this.loggedIn = false;
        location.reload();
      },
      error => {
        console.log("logout error: "+ JSON.stringify(error));
      }
    )
  }

}
