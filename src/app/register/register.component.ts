import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { Users } from '../shared/models/users';
import { Roles } from "../shared/models/roles";
//  Services
import { UsersService } from "../services/users.service";
import { RolesService } from "../services/roles.service";
import { CssService } from '../services/css.service';

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
  emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  url: string = '';
  selectedFile: FormData;

  constructor(private _formBuilder: FormBuilder, private _usersService: UsersService, private _rolesService: RolesService, private _cssService: CssService) { }

  ngOnInit() {
    this.user = new Users();
    this.getAllRoles();
    this.user.role_id = this.roleSelected;
    this.registerForm = this._formBuilder.group({
      'username': new FormControl('', [Validators.required, Validators.maxLength(20)]),
      'firstname': new FormControl('', [Validators.required, Validators.maxLength(20)]),
      'lastname': new FormControl('', [Validators.required, Validators.maxLength(20)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      'password': new FormControl('', [Validators.required]),
      'image': new FormControl(''),
      'role_id': new FormControl('', [Validators.required])
    });
  }

  // Get all roles
  getAllRoles() {
    this._rolesService.getAllRoles().subscribe(
      (datas: Roles[]) => {
        this.allRoles = datas;
      }
    );
  }

  // Post new user
  addUsers(f: NgForm) {
    console.log(f);
    
    // f.value.image = this.selectedFile;
    // let _formData = new FormData();
    // _formData.append("username", f.value.username);
    // _formData.append("firstname", f.value.firstname);
    // _formData.append("lastname", f.value.lastname);
    // _formData.append("email", f.value.email);
    // _formData.append("password", f.value.password);
    // _formData.append("image", this.selectedFile);
    // _formData.append("role_id", f.value.role_id);
    // var body = JSON.stringify(_formData);
    this._usersService.addUser(f.value).subscribe(res => {
      this.statut = res['successAdd'];
      this.iscreated = true;
    });
    // Réinitialiser le formulaire
    this.registerForm.reset();
  }

  getCssClassInput(champ: string) {
    return this._cssService.getCssClassInput(this.registerForm, champ);
  }

  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.selectedFile = event.target.files[0];
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  onFileChanged(event) {
    const fd = new FormData();
    const selectedFile = <File>event.target.files[0];
    fd.append('image', selectedFile, selectedFile.name);
    this.selectedFile = fd;
  }

  onUpload() {
    // upload code goes here
    if(this.selectedFile){
      // console.log(this.selectedFile.get('image'));
      
      this._usersService.upload(this.selectedFile).subscribe(
         res => {
           console.log(res);
         }
      );
    }
  }
}
