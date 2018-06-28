import { Component, OnInit } from '@angular/core';
import { Users } from '../shared/models/users';
// Services
import { UsersService } from '../services/users.service';
import { PagerService } from '../services/pager.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // For the pagination
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  allUsers: Users[] = [];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  constructor(private _usersService: UsersService, private _pagerService: PagerService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  // Get all users
  getAllUsers() {
    this._usersService.getAllUsers().subscribe(
      (datas: Users[]) => {
        this.allUsers = datas;
        if (!this.pager.currentPage) {
          this.pager.currentPage = 1;
        }
        this.setPage(this.pager.currentPage);
      }
    );
  }

  // Delete user by id
  deleteUsers(user: Users) {
    this._usersService.deleteUsersById(user.user_id)
      .subscribe(datas => {
        this.statusCode = 204;
        if (datas['successDelete']) {
          this.getAllUsers();
        }
        else {
          console.log('Fail delete');
        }
      },
        errorCode => this.statusCode = errorCode);
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this._pagerService.getPager(this.allUsers.length, page, 5);
    // get current page of items
    this.pagedItems = this.allUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }


}
