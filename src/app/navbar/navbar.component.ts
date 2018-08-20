import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Users } from '../shared/models/users';
// Services
import { SharingService } from '../services/sharing.service';
import { UsersService } from '../services/users.service';
// Pipes
import { GenderPipe } from "../pipes/gender.pipe";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string = 'Bootgular';
  userConnected: Users;

  constructor(private _usersService: UsersService, private _sharingService: SharingService, private _route: Router) {
  }

  ngOnInit() {
    this.userConnected = JSON.parse(this._sharingService.getSettings('userConnected'))[0];
  }

  logout(){
    this.userConnected.is_connected = false;
    this._usersService.logout(this.userConnected).subscribe(
      res => {
        this._sharingService.cleanAll();
        this._route.navigate(['login']);
      }
    );
  }

  isAdmin(){
    return this._usersService.isAdmin(this.userConnected);
  }
}
