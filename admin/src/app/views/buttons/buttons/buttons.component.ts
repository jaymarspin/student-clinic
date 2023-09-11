import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddOrEditMedicineComponent } from '../add-or-edit-medicine/add-or-edit-medicine.component';
import { AddStocksComponent } from '../add-stocks/add-stocks.component';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  states = ['normal', 'active', 'disabled'];
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  constructor(public matdialog: MatDialog) { }

  async addMedicine() {
    let dialog = this.matdialog.open(AddOrEditMedicineComponent,{width: '60%',height: '70%'});
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Medicines Successfully added',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false
        });
        
      }
    });
  }

  edit(){
    let dialog = this.matdialog.open(AddOrEditMedicineComponent,{width: '60%',height: '70%'});
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Medicines Successfully Updated',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false
        });
        
      }
    });
  }
  addStocks(){
    let dialog = this.matdialog.open(AddStocksComponent,{width: '60%',height: '70%'});
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Medicines Successfully Updated',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false
        });
        
      }
    });
  }
}
