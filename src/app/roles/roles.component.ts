import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Roles } from '../shared/models/roles';
// Services
import { RolesService } from '../services/roles.service';
import { PagerService } from '../services/pager.service';

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

  createRoleForm: FormGroup;
  statusCode: number;
  messageDelete: string;
  allRoles: Roles[] = [];
  statut: boolean = false;
  iscreated: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _rolesService: RolesService, private _pagerService: PagerService) { }

  ngOnInit() {
    this.getAllRoles();
    this.createRoleForm = this._formBuilder.group({
      'libelle' : ['', Validators.required]
    });
  }

  // Get all roles
  getAllRoles(){
    this._rolesService.getAllRoles().subscribe(
      (datas: Roles[]) => {
        this.allRoles = datas;
        this.setPage(1);
      }
    );
  }

  // Post new role
  addRoles(f: NgForm){
    this._rolesService.addRole(f.value).subscribe(res => 
      {
        this.statut = res['successAdd'];
        this.iscreated = true;
        this.getAllRoles();
      });
    // Réinitialiser le formulaire
    // this.createRoleForm.reset();
  }

  // Delete role by id
  deleteRoles(role: Roles) {
    this._rolesService.deleteRoleById(role.role_id)
      .subscribe(datas => {
        this.statusCode = 204;
        if(datas['successDelete']){
          this.messageDelete = "";
          this.getAllRoles();
        }
        else{
          this.messageDelete = datas['message'];
        }
      },
      errorCode => this.statusCode = errorCode);    
  }

  resetModalForm(){
    this.iscreated = false;
    this.createRoleForm.reset();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this._pagerService.getPager(this.allRoles.length, page, 5);
    // get current page of items
    this.pagedItems = this.allRoles.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
