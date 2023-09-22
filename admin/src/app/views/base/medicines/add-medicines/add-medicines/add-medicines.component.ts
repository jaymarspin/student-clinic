import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dosage, medicineData } from 'src/app/interfaces/inventories.interface';
import { UserToken } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InventoriesService } from 'src/app/services/inventories/inventories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-medicines',
  templateUrl: './add-medicines.component.html',
  styleUrls: ['./add-medicines.component.scss'],
})
export class AddMedicinesComponent implements OnInit {
  choosenMedicine: Dosage = {
    dosage: '',
  };

  medicineData: medicineData = {
    description: '',
    dosageVal: 0,
    student: 0,
    action: '',
    quantity: 1,
    inventoriesVal: 0,
    date: '',
  };
  userToken: UserToken = {
    token: '',
    id: 0,
    user: '',
    role: '',
  };
  constructor(
    private dialogRef: MatDialogRef<AddMedicinesComponent>,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    public matdialog: MatDialog,
    public inventoriesService: InventoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
  }

  async addMedicine() {
    if (this.choosenMedicine.dosage !== '') {
      if (
        (this.medicineData.description !== undefined &&
          this.medicineData.description !== '' &&
          this,
        this.medicineData.date !== '')
      ) {
        await this.spinner.show();
        this.medicineData.dosageVal = this.data.medicine.dosage[0].id;
        this.medicineData.student = this.data.student.id;

        this.medicineData.inventoriesVal = this.data.medicine.id;

        this.inventoriesService
          .addMedicine(this.medicineData, this.userToken.token)
          .subscribe(
            (response) => {
              this.dialogRef.close(true);
            },
            (err) => {
              this.dialogRef.close(false);
            }
          );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Dont leave the Description Empty',
          timer: 2500,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Add a dosage',
        timer: 2500,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
