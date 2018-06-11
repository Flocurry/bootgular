import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Roles } from '../shared/models/roles';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() titleModalChild: string;
  @Input() labelSaveBtnChild: string;
  @Input() modalFormChild: FormGroup;
  @Input() editRoleChild: Roles;
  @Input() editModeChild: boolean = false;
  @Input() createModeChild: boolean = false;

  @Output() saveFormParent = new EventEmitter();

  // Closed the modal edit role after save ok
  @ViewChild('idBtnCloseModal') closeModal: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  saveForm(f) {
    this.saveFormParent.emit([f, this.closeModal]);
  }

}
