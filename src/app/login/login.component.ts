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
  userSexe: string;
  isLoginClick: Boolean = false;
  userExist: Boolean = false;

  constructor(private cookieService: CookieService, private _usersService: UsersService, private _sharingService: SharingService, private _route: Router) { }

  ngOnInit() {
    this.user = new Users();
  }

  login(f: NgForm) {
    this._usersService.isUserExists(f.value).subscribe(
      (datas: Users) => {
        this.user = datas;
        // On stocke le token xsrf
        this._sharingService.clearSettings('token');
        this._sharingService.setSettings('token', this.cookieService.get('XSRF-TOKEN'));
        this.isLoginClick = true;
        if (!this.isEmpty(datas)) {
          this.userExist = true;
          // On stocke en session le user (on le stringify)
          this._sharingService.setSettings('userConnected', JSON.stringify(this.user));
          // Redirection vers home si login ok
          this._route.navigate(['/home']);
        }
      }
    );
  }
  
  isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }
}
