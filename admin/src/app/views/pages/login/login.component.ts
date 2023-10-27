import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLogin } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userLogin: UserLogin = {
    username: '',
    password: '',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private cookieService: CookieService,
    private usersService: UsersService
  ) {}

  async login() {
    await this.spinner.show();
    this.usersService.login(this.userLogin).subscribe({
      next: async (res) => {

        console.log(res)
        this.spinner.hide();
        if (!res.id) {
          Object.entries(res).map(async ([key, value]) => {
            await Swal.fire({
              icon: 'error',
              title: 'invalid credentials',
              showConfirmButton: false,
              timer: 1500,
              backdrop: false,
            });
          });
        } else {
          await this.setter(res);
          await this.router.navigate(['']);
        }
      },
      error: async (err) => {
        await Swal.fire({
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
          backdrop: false,
        });

        this.spinner.hide();
      },
    });
  }

  async setter(res: any): Promise<void> {
    this.cookieService.set('token', res.token);
    this.cookieService.set('id', res.id);
    this.cookieService.set('user', res.user);
    this.cookieService.set('role', res.role);
  }

  loginEnter(event: any){
 
    if(event.keyCode === 13){
      this.login()
    }
  }
}
