import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { InventoriesService } from '../../../services/inventories/inventories.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  Inventories,
  InventoriesDialog,
} from 'src/app/interfaces/inventories.interface';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-or-edit-medicine',
  templateUrl: './add-or-edit-medicine.component.html',
  styleUrls: ['./add-or-edit-medicine.component.scss'],
})
export class AddOrEditMedicineComponent implements OnInit {
  dosage: string = '';
  stocks: number = 0;

  dosageStocks = new Array<any>();
  inventories: Inventories = {
    medicinename: '',
    indication: '', 
    stocks: [],
    dosage: [],
  };
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddOrEditMedicineComponent>,
    private inventoriesService: InventoriesService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: InventoriesDialog
  ) {}
  ngOnInit(): void {
    if (this.data.edit) {
      this.inventories = this.data.inventories ?? this.inventories;
    }
  }

  addDosage() {
    let dosage = _.find(this.inventories.dosage, { dosage: this.dosage });
    if (
      dosage?.dosage !== this.dosage ||
      this.inventories.dosage?.length === 0
    ) {
      this.dosage = '';
      this.stocks = 0;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Already Occured',
        timer: 2000,
      });
    }
  }
  async addMedicine() {
    if (this.inventories.medicinename !== '') {
      this.inventories.dosage!.push({ dosage: '0' });
      this.inventories.stocks!.push({ stocks: this.stocks });
      this.dosageStocks.push({
        dosage: this.dosage,
        stocks: this.stocks,
      });

      await this.spinner.show();
      const userToken = await this.auth.init();
      this.inventoriesService
        .addInventory(this.inventories, userToken.token)
        .subscribe(
          (Response) => {
            console.log(Response);
            this.dialogRef.close(true);
          },
          (err) => {
            console.log(err);
            this.dialogRef.close(false);
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Dont leave a field empty',
      });
    }
  }

  async updateMedicine() {
    if (
      this.inventories.medicinename !== '' &&
      this.inventories.dosage!.length > 0
    ) {
      await this.spinner.show();
      setTimeout(async () => {
        await Swal.fire({
          title: 'Update Succesful',
          icon: 'info',
          timer: 2500,
        });
        this.spinner.hide();
      }, 2000);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Dont leave a field empty',
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
