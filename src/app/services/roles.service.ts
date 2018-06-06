import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Roles } from '../shared/models/roles';
import { SharingService } from './sharing.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RolesService {

  constructor(private _cookieService: CookieService, private _sharingService: SharingService, private _http: HttpClient) { }

  getAllRoles() {
    return this._http.get('http://localhost/roles');
  }

  /**
   * CrÃ©ation d'un role
   * @param role : Objet Roles
   */
  addRole(role: Roles): Observable<Roles> {
    return this._http.post<Roles>('http://localhost/roles/save', role);
  }

  /**
   * Suppression d'un rôle
   * @param id : Id du rôle à supprimer
   */
  deleteRoleById(id: number) {
    let headers = new HttpHeaders().set('X-CSRF-TOKEN', this._sharingService.getSettings('token'));
    return this._http.delete('http://localhost/roles/delete/' + id, { headers: headers });
  }

  /**
   * Edition d'un rôle
   * @param role 
   */
  editRole(role: Roles) {
    return this._http.put<Roles>('http://localhost/roles/edit', role);
  }

}
