import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
 
  constructor(public matdialog: MatDialog){
    
  }

  editUser(){
    
    let dialog = this.matdialog.open(AddOrEditUserComponent,{width: '60%',height: '70%'});
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

  addUser(){

    let dialog = this.matdialog.open(AddOrEditUserComponent,{width: '60%',height: '70%'});
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
