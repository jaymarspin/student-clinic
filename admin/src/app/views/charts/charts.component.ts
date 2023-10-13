import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../services/users/users.service';
import { User, UserToken } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  users: User[] = new Array<User>()
  userToken: UserToken ={
    token: '',
    id: 0,
    user: '',
    role: '',
  }
  constructor(
    public matdialog: MatDialog,
    private spinner: NgxSpinnerService,
    public UsersService: UsersService,
    private auth: AuthService
  ) {
   
  }

  async deleteUser(user: User){
    const confirm =  await Swal.fire({
      title: `Are you sure you want to delete ${user.username}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }) 
    if(confirm.isConfirmed){
      this.UsersService.deleteUser(user,this.userToken.token).subscribe(async response =>{
        if(response.affected > 0){
          await Swal.fire({
            icon: 'success',
            title: 'User Successfully deleted',
            showConfirmButton: false,
            timer: 3500,
            backdrop: false,
          });
          this.getUsers()
        }
      },error =>{
        Swal.fire({
          icon:'error',
          title: error
        })
      })
    }
  }
  async ngOnInit(): Promise<void> {
    this.getUsers()
    this.userToken = await this.auth.init();
  }

  async getUsers(){
    // await this.spinner.show();
    this.UsersService.getUsers(this.userToken.token).subscribe((res) => {
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
          title: 'User Successfully added',
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
