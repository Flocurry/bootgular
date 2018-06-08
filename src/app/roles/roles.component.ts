import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Roles } from '../shared/models/roles';
// Services
import { RolesService } from '../services/roles.service';
import { PagerService } from '../services/pager.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  // For the pagination
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  titleModalParent: string;
  labelBtnSaveParent:string;
  createRoleForm: FormGroup;
  editRoleForm: FormGroup;
  statusCode: number;
  messageDelete: string;
  allRoles: Roles[] = [];
  editRole: Roles;
  statut: boolean = false;
  iscreated: boolean = false;
  editClicked: boolean = false;

  // Closed the modal edit role after save ok
  @ViewChild('idBtnCloseEditModal') closeModalEdit: ElementRef;

  constructor(private _formBuilder: FormBuilder, private _rolesService: RolesService, private _pagerService: PagerService) { }

  ngOnInit() {
    this.getAllRoles();
    this.createRoleForm = this._formBuilder.group({
      'libelle': ['', Validators.required]
    });
    this.editRoleForm = this._formBuilder.group({
      'role_id': ['', Validators.required],
      'libelle': ['', Validators.required]
    });
  }

  // Get all roles
  getAllRoles() {
    this._rolesService.getAllRoles().subscribe(
      (datas: Roles[]) => {
        this.allRoles = datas;
        if (!this.pager.currentPage) {
          this.pager.currentPage = 1;
        }
        this.setPage(this.pager.currentPage);
      }
    );
  }

  // Post new role
  addRoles(f: NgForm) {
    this._rolesService.addRole(f.value).subscribe(res => {
      this.statut = res['successAdd'];
      this.iscreated = true;
      this.getAllRoles();
    });
  }

  // Delete role by id
  deleteRoles(role: Roles) {
    this._rolesService.deleteRoleById(role.role_id)
      .subscribe(datas => {
        this.statusCode = 204;
        if (datas['successDelete']) {
          this.messageDelete = "";
          this.getAllRoles();
        }
        else {
          this.messageDelete = datas['message'];
        }
      },
        errorCode => this.statusCode = errorCode);
  }

  resetModalFormNewRole() {
    this.iscreated = false;
    this.createRoleForm.reset();
  }

  resetModalFormEditRole() {
    this.editClicked = false;
    this.editRoleForm.reset();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this._pagerService.getPager(this.allRoles.length, page, 5);
    // get current page of items
    this.pagedItems = this.allRoles.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  showCreateModal(){
    this.titleModalParent = 'New Role';
    this.labelBtnSaveParent = 'Create';
  }

  showEditModal(role: Roles) {
    this.titleModalParent = 'Edit Role';
    this.labelBtnSaveParent = 'Save';
    this.editRoleForm = this._formBuilder.group({
      'role_id': [role.role_id, Validators.required],
      'libelle': [role.libelle, Validators.required]
    });
    this.editRole = role;
    this.editClicked = true;
  }

  editRoles(f: NgForm) {
    this._rolesService.editRole(f.value).subscribe(res => {
      this.statut = res['successEdit'];
      // Si l'édition est ok
      if (this.statut) {
        this.getAllRoles();
        // Fermer la modal
        this.closeModalEdit.nativeElement.click();
      }
    });
  }

}
