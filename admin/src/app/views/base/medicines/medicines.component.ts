import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Inventories,
  medicineData,
} from 'src/app/interfaces/inventories.interface';
import { UserToken } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InventoriesService } from 'src/app/services/inventories/inventories.service';
import Swal from 'sweetalert2';
import { AddMedicinesComponent } from './add-medicines/add-medicines/add-medicines.component';
import { Student } from 'src/app/interfaces/student.interface';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
})
export class MedicinesComponent implements OnInit {
  inventories: Inventories[] = new Array<Inventories>();

  medicines: medicineData[] = new Array<medicineData>();
  userToken: UserToken = {
    token: '',
    id: 0,
    user: '',
    role: '',
  };
  constructor(
    private dialogRef: MatDialogRef<MedicinesComponent>,
    private spinner: NgxSpinnerService,
    private inventoriesService: InventoriesService,
    private auth: AuthService,
    public matdialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {}
  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
    this.getInventories();
    this.getMedicineByStudent();
  }
  close() {
    this.dialogRef.close();
  }
  async getInventories(): Promise<void> {
    await this.spinner.show();

    this.inventoriesService.getInventories(this.userToken.token).subscribe(
      (Response) => {
        this.spinner.hide();
        this.inventories = Response;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  async getMedicineByStudent() {
    await this.spinner.show();
    const userToken: UserToken = await this.auth.init();
    this.inventoriesService.getByStudent(this.data, userToken.token).subscribe(
      (Response) => {
        this.medicines = Response;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  async addMedicine() {
    let dialog2 = this.matdialog.open(AddMedicinesComponent, {
      width: '40%',
      height: '40%',
      data: {
        student: this.data,
  
      },
    });
    dialog2.afterClosed().subscribe(async (res) => {
      this.spinner.hide();
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Medicine Successfully added',
          showConfirmButton: false,
          timer: 2500,
          backdrop: false,
        });
        this.getInventories();
        this.getMedicineByStudent();
      } else if (res === false) {
        await Swal.fire({
          icon: 'error',
          title: 'Error Occured',
          showConfirmButton: false,
          timer: 2500,
          backdrop: false,
        });
      }
    });
  }
}
