import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { Dosage, medicineData } from 'src/app/interfaces/inventories.interface';
import { UserToken } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { InventoriesService } from 'src/app/services/inventories/inventories.service';

@Component({
  selector: 'app-add-medicines',
  templateUrl: './add-medicines.component.html',
  styleUrls: ['./add-medicines.component.scss']
})

export class AddMedicinesComponent implements OnInit{
  choosenMedicine: Dosage = {
    dosage: '',
  }

  medicineData: medicineData = {
    description: '',
    dosageVal: 0,
    student: 0,
    action: '',
    quantity: 1,
    inventoriesVal: 0,
    date: ''
  }

  constructor(
    private dialogRef: MatDialogRef<AddMedicinesComponent>,
    private spinner: NgxSpinnerService,  
    private auth: AuthService,
    public matdialog: MatDialog,
    public inventoriesService: InventoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        console.log(this.data)
    }

   
    async addMedicine(){
      const userToken: UserToken = await this.auth.init()
      await this.spinner.show()
      this.medicineData.dosageVal = this.data.medicine.dosage[0].id
      this.medicineData.student = this.data.student.id

      this.medicineData.inventoriesVal = this.data.medicine.id
      
      this.inventoriesService.addMedicine(this.medicineData,userToken.token).subscribe(response =>{
        this.dialogRef.close(true)
      },err=>{
        this.dialogRef.close(false)
      })
      
    }
 

    close(){
      this.dialogRef.close()
    }
}
