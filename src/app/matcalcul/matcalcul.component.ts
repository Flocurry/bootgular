import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matcalcul',
  templateUrl: './matcalcul.component.html',
  styleUrls: ['./matcalcul.component.css']
})
export class MatcalculComponent {

  number1: number;
  number2: number;
  sum: number;
  product: number;
  substract: number;

  compute(){
    this.sum = this.number1 + this.number2;
    this.product = this.number1 * this.number2;
    this.substract = this.number1 - this.number2;
  }
}
