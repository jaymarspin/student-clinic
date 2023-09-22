import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddOrEditMedicineComponent } from '../add-or-edit-medicine/add-or-edit-medicine.component';
import { AddStocksComponent } from '../add-stocks/add-stocks.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { InventoriesService } from 'src/app/services/inventories/inventories.service';
import { UserToken } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Inventories } from 'src/app/interfaces/inventories.interface';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  userToken: UserToken ={
    token: '',
    id: 0,
    user: '',
    role: '',
  }
  inventories:Inventories[] = new Array<Inventories>()
  constructor(
    public matdialog: MatDialog,
    private spinner: NgxSpinnerService,
    private inventoriesService: InventoriesService,
    private auth: AuthService
  ) {}
  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
    this.getInventories();
  }
  async deleteMedicine(inventories: Inventories){
    const confirm =  await Swal.fire({
      title: `Are you sure you want to delete ${inventories.medicinename}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }) 
    if(confirm.isConfirmed){
      
    }
  }
  async getInventories() {
    await this.spinner.show(); 
    this.inventoriesService.getInventories(this.userToken.token).subscribe(
      (Response) => {
        this.spinner.hide()
        console.log(Response);
        this.inventories = Response
      },
      (err) => {
        this.spinner.hide()
        console.log(err);
      }
    );
  }
  
  async addMedicine() {
    let dialog = this.matdialog.open(AddOrEditMedicineComponent, {
      width: '60%',
      height: '70%',
    });
    dialog.afterClosed().subscribe(async (res) => {
      this.spinner.hide();
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Medicines Successfully added',
          showConfirmButton: false,
          timer: 2000,
          backdrop: false,
        });
        this.getInventories()
      }
    });
  }

  edit() {
    let dialog = this.matdialog.open(AddOrEditMedicineComponent, {
      width: '60%',
      height: '70%',
    });
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Medicines Successfully Updated',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false,
        });
      }
    });
  }
  addStocks() {
    let dialog = this.matdialog.open(AddStocksComponent, {
      width: '60%',
      height: '70%',
    });
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Medicines Successfully Updated',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false,
        });
      }
    });
  }
}
