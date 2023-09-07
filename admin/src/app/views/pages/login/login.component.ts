import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private spinner: NgxSpinnerService,private router: Router) {}

  async login() {
    await this.spinner.show();

    setTimeout(async () => {
      this.spinner.hide();
      await Swal.fire({
        icon: 'success',
        title: 'Successfully Login',
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
      }); 
      this.router.navigate([""])

    }, 2000);
  }
}
