import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-or-edit-medicine',
  templateUrl: './add-or-edit-medicine.component.html',
  styleUrls: ['./add-or-edit-medicine.component.scss'],
})
export class AddOrEditMedicineComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddOrEditMedicineComponent>
  ) {}

  async add() {
    await this.spinner.show();

    setTimeout(async () => {
      this.spinner.hide();
      await Swal.fire({
        icon: 'success',
        title: 'Successfully Added',
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
      });
      this.dialogRef.close();
    }, 2000);
  }
  close() {
    this.dialogRef.close();
  }
}
