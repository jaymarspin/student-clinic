import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../services/users/users.service';
import { User } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  users: User[] = new Array<User>()
  constructor(
    public matdialog: MatDialog,
    private spinner: NgxSpinnerService,
    public UsersService: UsersService
  ) {}
  async ngOnInit(): Promise<void> {
    this.getUsers()
  }

  async getUsers(){
    await this.spinner.show();
    this.UsersService.getUsers().subscribe((res) => {
      this.users = res
      console.log(this.users)
      this.spinner.hide()
    });
  }
  editUser() {
    let dialog = this.matdialog.open(AddOrEditUserComponent, {
      width: '60%',
      height: '70%',
    });
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Locations Successfully added',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false,
        });
      }
    });
  }

  addUser() {
    let dialog = this.matdialog.open(AddOrEditUserComponent, {
      width: '60%',
      height: '70%',
    });
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        
        await Swal.fire({
          icon: 'success',
          title: 'User Successfully added',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false,
        });
        this.getUsers()
      }
    });
  }
}
