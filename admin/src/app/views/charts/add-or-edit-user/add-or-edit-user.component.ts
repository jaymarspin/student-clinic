import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {UsersService} from '../../../services/users/users.service'
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserToken } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.scss'],
})
export class AddOrEditUserComponent implements OnInit{
  username: string = '';
  rpassword: string = '';
  password: string = '';
  fullname: string = ''
  role: string = 'user'
  
  userToken: UserToken ={
    token: '',
    id: 0,
    user: '',
    role: '',
  }
  constructor(
    private spinner: NgxSpinnerService,
    public UsersService: UsersService,
    private dialogRef: MatDialogRef<AddOrEditUserComponent>,
    private auth: AuthService
  ) {}
  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
  }

  async addUser(){
    await this.spinner.show()
    this.UsersService.register({
      username: this.username,password: this.password,fullname: this.fullname,role: this.role
    },this.userToken.token).subscribe(response =>{
      console.log(response)
      this.spinner.hide()
      this.dialogRef.close(true)
    })

  }
  close(){
    this.dialogRef.close()
  }
}
