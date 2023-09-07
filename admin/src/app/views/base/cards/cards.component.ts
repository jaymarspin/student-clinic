import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddStudentComponent } from '../add-student/add-student.component';
import { MedicinesComponent } from '../medicines/medicines.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];

  imgContext = { $implicit: 'top', bottom: 'bottom' };

  constructor(public matdialog: MatDialog) { }

  async addStudent() {
    let dialog = this.matdialog.open(AddStudentComponent,{width: '60%',height: '70%'});
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Locations Successfully added',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false
        });
        
      }
    });
  }

  viewMedicines(){
    let dialog = this.matdialog.open(MedicinesComponent,{width: '60%',height: '60%'});
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Locations Successfully added',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false
        });
        
      }
    });
  }

}
