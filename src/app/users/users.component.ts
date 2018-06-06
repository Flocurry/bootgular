import { Component, OnInit } from '@angular/core';
import { Users } from '../shared/models/users';
// Services
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  // Component properties
  allUsers: Users[] = [];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  constructor(private _usersService: UsersService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  // Get all users
  getAllUsers(){
    this._usersService.getAllUsers().subscribe(
      (datas: Users[]) => {
        this.allUsers = datas;
      }
    );
  }

  // Delete user by id
  deleteUsers(user: Users) {  
    this._usersService.deleteUsersById(user.user_id)
      .subscribe(datas => {
        this.statusCode = 204;
        if(datas['successDelete']){
          this.getAllUsers();
        }
        else{
          console.log('Fail delete');
        }
    },
    errorCode => this.statusCode = errorCode);    
  }


}
