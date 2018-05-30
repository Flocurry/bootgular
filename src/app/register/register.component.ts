import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from "../services/users.service";
import { RolesService } from "../services/roles.service";
import { Users } from '../shared/models/users';
import { Roles } from "../shared/models/roles";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: Users;
  allRoles: Roles[] = [];
  roleSelected: number = 1;
  statut: Boolean = false;
  iscreated: Boolean = false;

  constructor(private _formBuilder: FormBuilder, private _usersService: UsersService, private _rolesService: RolesService) {}

  ngOnInit() {
    this.user = new Users();
    this.getAllRoles();
    this.user.role_id = this.roleSelected;
    this.registerForm = this._formBuilder.group({
      'username' : ['', Validators.required],
      'firstname' : ['', Validators.required],
      'lastname' : ['', Validators.required],
      'email' : ['', Validators.required],
      'password' : ['', Validators.required],
      'role_id' : ['', Validators.required]
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

  // Post new user
  addUsers(f: NgForm){
      this._usersService.addUser(f.value).subscribe(res => 
        {
          this.statut = res['successAdd'];
          this.iscreated = true;
        });
      // Réinitialiser le formulaire
      this.registerForm.reset();
  }
}
