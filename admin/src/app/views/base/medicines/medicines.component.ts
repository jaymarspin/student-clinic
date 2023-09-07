import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
})
export class MedicinesComponent {
  constructor(
    private dialogRef: MatDialogRef<MedicinesComponent>,
    private spinner: NgxSpinnerService
  ) {}
  close() {
    this.dialogRef.close();
  }
  async addMedicine() {
    await this.spinner.show()
    setTimeout(async () =>{
      this.spinner.hide()
      await Swal.fire({
        icon: 'success',
        title: 'Medicine Successfully Added',
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
      });
      this.dialogRef.close();

    },3000)
  }
}
