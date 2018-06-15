import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Users } from '../shared/models/users';
// Services
import { SharingService } from '../services/sharing.service';
// Pipes
import { GenderPipe } from "../pipes/gender.pipe";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string = 'Bootgular';
  usernameLogin: string;
  isUserIsAdmin: string; 

  constructor(private _sharingService: SharingService, private _route: Router) {
  }

  ngOnInit() {
    this.usernameLogin = this._sharingService.getSettings('usernameLogged');
    this.isUserIsAdmin = this._sharingService.getSettings('isUserIsAdmin');
  }

  logout(){
    this._sharingService.clearSettings('usernameLogged');
    this._sharingService.clearSettings('isUserIsAdmin');
    this._sharingService.clearSettings('token');
    this._route.navigate(['login']);
  }
}
