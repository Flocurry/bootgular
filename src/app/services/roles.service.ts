import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RolesService {

  constructor(private _http: HttpClient) { }

  public getAllRoles(){
    return this._http.get('http://localhost/roles');
  }

}
