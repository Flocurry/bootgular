import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Users } from "../shared/models/users";
import { Options } from 'selenium-webdriver/edge';

@Injectable()
export class UsersService {
  private userLogged: string;

  constructor(private _http: HttpClient) {
  }

  /**
   * Récuération des users
   */
  getAllUsers(){
    return this._http.get('http://localhost/users');
  }

  /**
   * Check si le user existe
   * 
   * @param user : Objet User
   */
  isUserExists(user: Users){
    let params = new HttpParams().set("username", user.username).set("password", user.password);
    return this._http.get('http://localhost/login/user', {params: params, withCredentials:true});
  }

  /**
   * Suppression d'un user
   * 
   * @param id : Id du user
   */
  deleteUsersById(id){
    return this._http.delete('http://localhost/users/delete/'+id);
  }

  /**
   * Création d'un user
   * @param user : Objet User
   */
  addUser (user: Users): Observable<Users> {
    return this._http.post<Users>('http://localhost/users/save', user);
  }

  private handleError (error: Response | any) {
    console.error('UsersService::handleError', error);
    return Observable.throw(error);
  }

  setUserLogged(username){
    this.userLogged = username;
  }

  getUserLogged(){
    return this.userLogged;
  }
}
