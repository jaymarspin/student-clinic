import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { InventoriesService } from '../../../services/inventories/inventories.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Inventories } from 'src/app/interfaces/inventories.interface';
import * as _ from 'lodash'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-or-edit-medicine',
  templateUrl: './add-or-edit-medicine.component.html',
  styleUrls: ['./add-or-edit-medicine.component.scss'],
})
export class AddOrEditMedicineComponent {
  dosage: string = ''
  stocks: number = 0
  indexRetained: number | undefined
  inventories: Inventories = {
    medicinename: '',
    indication: '',
    stocks: [],
    dosage: []
  };
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddOrEditMedicineComponent>,
    private inventoriesService: InventoriesService,
    private auth: AuthService
  ) {}
  
    getDosageIndex(i:number){
      this.indexRetained = i
      // alert(i)
    }
  addDosage(){
    let dosage = _.find(this.inventories.dosage, {dosage: this.dosage});
    if(dosage?.dosage !== this.dosage || this.inventories.dosage?.length === 0){
      this.inventories.dosage!.push({dosage: this.dosage})
      this.inventories.stocks!.push({stocks: this.stocks})
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Already Occured',
        timer: 2000
      })
    }
  }
  async addMedicine() {
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

    // setTimeout(async () => {
    //   this.spinner.hide();
    //   await Swal.fire({
    //     icon: 'success',
    //     title: 'Successfully Added',
    //     showConfirmButton: false,
    //     timer: 1500,
    //     backdrop: false,
    //   });
    //   this.dialogRef.close();
    // }, 2000);
  }
  close() {
    this.dialogRef.close();
  }
}
