import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Roles } from '../shared/models/roles';
// Services
import { CssService } from '../services/css.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  // Properties input du parent component
  @Input() titleModalChild: string;
  @Input() labelSaveBtnChild: string;
  @Input() modalFormChild: FormGroup;
  @Input() editRoleChild: Roles;
  @Input() editModeChild: boolean = false;

  // Event output vers le parent component
  @Output() saveFormParent = new EventEmitter();

  // Closed the modal edit role after save ok
  @ViewChild('idBtnCloseModal') closeModal: ElementRef;


  constructor(private _cssService: CssService) { }

  ngOnInit() {
  }

  saveForm(f) {
    this.saveFormParent.emit([f, this.closeModal]);
  }

  getCssClassInput(champ: string) {
    return this._cssService.getCssClassInput(this.modalFormChild, champ);
  }

}
