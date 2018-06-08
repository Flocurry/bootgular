import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() titleModalChild: string;
  @Input() labelSaveBtnChild: string;
  @Input() modalFormChild: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
