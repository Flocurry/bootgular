import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CssService {

  constructor() { }

  getCssClassInput(f: FormGroup, champ: string) {
    if (f.controls[champ].valid && f.controls[champ].touched) {
      return 'inputTxtValid';
    }
    if (!f.controls[champ].valid && f.controls[champ].touched) {
      return 'inputTxtError';
    }
  }

}
