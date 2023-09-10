import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.scss'],
})
export class AddOrEditUserComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddOrEditUserComponent>
  ) {}

  addUser(){

  }
  close(){
    
  }
}
