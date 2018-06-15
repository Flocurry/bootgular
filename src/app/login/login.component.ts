import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../shared/models/users';
import { NavbarComponent } from '../navbar/navbar.component';
// Services
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../services/users.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Users;
  usernameLogin: string;
  isUserIsAdmin: boolean;
  isLoginClick: Boolean = false;
  userExist: Boolean = false;

  constructor(private cookieService: CookieService, private _usersService: UsersService, private _sharingService: SharingService, private _route: Router) { }

  ngOnInit() {
    this.user = new Users();
  }

  login(f: NgForm){
    this._usersService.isUserExists(f.value).subscribe(
      res => {
        this.userExist = res['successLogin'];
        // On stocke le token xsrf
        this._sharingService.clearSettings('token');
        // console.log(this.cookieService.get('XSRF-TOKEN'));
        this._sharingService.setSettings('token', this.cookieService.get('XSRF-TOKEN'));
        this.isLoginClick = true;
        // Redirection vers home si login ok
        if(this.userExist){
          this.usernameLogin = res['username'];
          this.isUserIsAdmin = <boolean>res['isuserisadmin'];
          this._sharingService.clearSettings('usernameLogged');
          this._sharingService.setSettings('usernameLogged', this.usernameLogin);
          this._sharingService.setSettings('isUserIsAdmin', this.isUserIsAdmin);
          this._route.navigate(['/home']);
        }
      }
    );
  }

}
