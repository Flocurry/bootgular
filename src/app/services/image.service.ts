import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {

  constructor(private _http: HttpClient) { }

  getImage(imageUrl: string): Observable<Blob> {
    return this._http.get(imageUrl, { responseType: 'blob' });
  }

}
