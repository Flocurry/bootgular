import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Users } from "../shared/models/users";

@Injectable()
export class UsersService {
  private userLogged: string;

  constructor(private _http: HttpClient) {
  }

  /**
   * Récuération des users
   */
  public getAllUsers(){
    return this._http.get('http://localhost/users');
  }

  /**
   * Check si le user existe
   * 
   * @param user : Objet User
   */
  public isUserExists(user: Users){
    return this._http.post('http://localhost/login/user', user);
  }

  /**
   * Suppression d'un user
   * 
   * @param id : Id du user
   */
  public deleteUsersById(id: number){
    return this._http.get('http://localhost/users/delete/'+id);
  }

  /**
   * Création d'un user
   * @param user : Objet User
   */
  public addUser (user: Users): Observable<Users> {
    return this._http.post<Users>('http://localhost/users/save', user);
  }

  private handleError (error: Response | any) {
    console.error('UsersService::handleError', error);
    return Observable.throw(error);
  }

  public setUserLogged(username){
    this.userLogged = username;
  }

  public getUserLogged(){
    return this.userLogged;
  }
}
