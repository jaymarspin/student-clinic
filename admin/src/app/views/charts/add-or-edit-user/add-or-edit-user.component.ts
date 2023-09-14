import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {UsersService} from '../../../services/users/users.service'
@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.scss'],
})
export class AddOrEditUserComponent {
  username: string = '';
  rpassword: string = '';
  password: string = '';
  fullname: string = ''
  role: string = 'user'
  

  constructor(
    private spinner: NgxSpinnerService,
    public UsersService: UsersService,
    private dialogRef: MatDialogRef<AddOrEditUserComponent>
  ) {}

  async addUser(){
    await this.spinner.show()
    this.UsersService.register({
      username: this.username,password: this.password,fullname: this.fullname,role: this.role
    }).subscribe(response =>{
      console.log(response)
      this.spinner.hide()
      this.dialogRef.close(true)
    })

  }
  close(){
    this.dialogRef.close()
  }
}
