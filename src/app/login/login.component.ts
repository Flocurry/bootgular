import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../shared/models/users';
import { NavbarComponent } from '../navbar/navbar.component';
// Services
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
  isLoginClick: Boolean = false;
  userExist: Boolean = false;

  constructor(private _usersService: UsersService, private _sharingService: SharingService, private _route: Router) { }

  ngOnInit() {
    this.user = new Users();
  }

  login(f: NgForm){
    this._usersService.isUserExists(f.value).subscribe(
      res => {
        this.userExist = res['successLogin'];
        this.isLoginClick = true;
        // Redirection vers home si login ok
        if(this.userExist){
          this.usernameLogin = res['username'];
          this._sharingService.clearSettings('usernameLogged');
          this._sharingService.setSettings('usernameLogged', this.usernameLogin);
          this._route.navigate(['/home']);
        }
      }
    );
  }

}
