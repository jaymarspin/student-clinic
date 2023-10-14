import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../../services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDialogData, UserToken } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.scss'],
})
export class AddOrEditUserComponent implements OnInit {
  username: string = '';
  rpassword: string = '';
  password: string = '';
  fullname: string = '';
  role: string = 'user';

  userToken: UserToken = {
    token: '',
    id: 0,
    user: '',
    role: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    public UsersService: UsersService,
    private dialogRef: MatDialogRef<AddOrEditUserComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {}
  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
    if (this.data.edit) {
      this.fullname = this.data.user?.fullname ?? '';
      this.username = this.data.user?.username ?? '';
      this.role = this.data.user?.role ?? 'user';
    }
  }

  async addUser() {
    if (
      this.fullname &&
      this.username &&
      this.password &&
      this.rpassword &&
      this.role
    ) {
      await this.spinner.show();
      this.UsersService.register(
        {
          username: this.username,
          password: this.password,
          fullname: this.fullname,
          role: this.role,
        },
        this.userToken.token
      ).subscribe((response) => {
        console.log(response);
        this.spinner.hide();
        this.dialogRef.close(true);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: `please don't leave a field empty`,
        timer: 1500,
      });
    }
  }

  async updateUser() {
    if (
      this.fullname &&
      this.username &&
      this.password &&
      this.rpassword &&
      this.role
    ) {
      this.UsersService.updateUser(
        {
          username: this.username,
          password: this.password,
          fullname: this.fullname,
          role: this.role,
          id: this.data.user?.id
        },
        this.userToken.token
      ).subscribe({
        next: (response) => {
          console.log(response);
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.spinner.hide();
          this.dialogRef.close(true);
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: `please don't leave a field empty`,
        timer: 1500,
      });
    }
    await this.spinner.show();
  }
  close() {
    this.dialogRef.close();
  }
}
