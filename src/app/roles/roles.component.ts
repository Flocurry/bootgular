import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Roles } from '../shared/models/roles';
// Services
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  createRoleForm: FormGroup;
  statusCode: number;
  messageDelete: string;
  allRoles: Roles[] = [];
  statut: boolean = false;
  iscreated: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _rolesService: RolesService) { }

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

}
