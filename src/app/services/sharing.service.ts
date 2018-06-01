import { Injectable } from '@angular/core';

@Injectable()
export class SharingService {

  constructor() { }

  setSettings(key: string, data: any){
    localStorage.setItem(key, data);
  }

  getSettings(key: string){
    return localStorage.getItem(key);
  }

  clearSettings(key: string){
    localStorage.removeItem(key);
  }

  cleanAll(){
    localStorage.clear();
  }

}
