import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Student } from 'src/app/interfaces/student.interface';
import { UserToken } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InventoriesService } from 'src/app/services/inventories/inventories.service';
import Swal from 'sweetalert2';

interface injury {
  description: string;
  date: string;
  student: any;
  action: string;
}
@Component({
  selector: 'app-add-or-edit-injuries',
  templateUrl: './add-or-edit-injuries.component.html',
  styleUrls: ['./add-or-edit-injuries.component.scss'],
})
export class AddOrEditInjuriesComponent implements OnInit {
  injuries = new Array<injury>();
  injury: injury = {
    description: '',
    date: '',
    student: 0,
    action: '',
  };
  userToken: UserToken = {
    token: '',
    id: 0,
    user: '',
    role: '',
  };
  constructor(
    private dialogRef: MatDialogRef<AddOrEditInjuriesComponent>,
    private spinner: NgxSpinnerService,
    private inventoriesService: InventoriesService,
    private auth: AuthService,
    public matdialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
    this.getInjuries()
 
  }


  async getInjuries(): Promise<void> {
    await this.spinner.show();

    this.inventoriesService.getInjuries(this.userToken.token,this.data.id).subscribe(
      (Response) => {
        this.spinner.hide();
        this.injuries = Response;
        console.log( this.injuries);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  async addInjury() {
   
    if (this.injury.description !== '' && this.injury.date !== '') {
      await this.spinner.show();

      this.injury.student = this.data.id;

      console.log(this.injury);
      this.inventoriesService
        .addInjury(this.injury, this.userToken.token)
        .subscribe(
          async (response) => {
            console.log(response);
            this.spinner.hide()
            await Swal.fire({
              icon: 'success',
              title: 'Injury Successfully added',
              showConfirmButton: false,
              timer: 3500,
              backdrop: false,
            });
            this.getInjuries()
          },
          (err) => {
            console.log(err);
            this.spinner.hide()
           
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Dont leave the Description Empty',
        timer: 2500,
      });
    }
  }

  close() {}
}
