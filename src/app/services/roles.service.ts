import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Roles } from '../shared/models/roles';

@Injectable()
export class RolesService {

  constructor(private _http: HttpClient) { }

  public getAllRoles(){
    return this._http.get('http://localhost/roles');
  }

  /**
   * Création d'un role
   * @param role : Objet Roles
   */
  public addRole (role: Roles): Observable<Roles> {
    return this._http.post<Roles>('http://localhost/roles/save', role);
  }

  public deleteRoleById(id: number){
    return this._http.get('http://localhost/roles/delete/'+id);
  }

}
