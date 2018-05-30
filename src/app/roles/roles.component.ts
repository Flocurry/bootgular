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
  cerateRoleForm: FormGroup;
  allRoles: Roles[] = [];
  statut: boolean = false;
  iscreated: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _rolesService: RolesService) { }

  ngOnInit() {
    this.getAllRoles();
    this.cerateRoleForm = this._formBuilder.group({
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
  addUsers(f: NgForm){
    this._rolesService.addRole(f.value).subscribe(res => 
      {
        this.statut = res['successAdd'];
        this.iscreated = true;
      });
    // // Réinitialiser le formulaire
    // this.cerateRoleForm.reset();
}

}
