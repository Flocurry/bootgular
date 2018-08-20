import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Services
import { SharingService } from '../services/sharing.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private _sharingService: SharingService, private _usersService: UsersService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('I am checking to see if you can view this page');
      let canAccess = false;
      let userConnected = JSON.parse(this._sharingService.getSettings('userConnected'))[0];
      if(this._usersService.isAdmin(userConnected)){
        canAccess = true;
      }
      else{
        alert("You don't have permission to view this page");
        canAccess = false;
        // Redirection vers la page de login
        this._router.navigate(['/login']);
      }
      return canAccess;
  }
}
