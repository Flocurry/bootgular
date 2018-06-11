import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, gender: string): any {
    if (gender == 'male'){  
      return "Mr. " + value;  
    }  
    else{  
      return "Miss. " + value;  
    }  
  }

}
