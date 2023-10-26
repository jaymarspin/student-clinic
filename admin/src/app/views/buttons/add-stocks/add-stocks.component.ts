import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inventories } from 'src/app/interfaces/inventories.interface';
import { UserToken } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InventoriesService } from 'src/app/services/inventories/inventories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-stocks',
  templateUrl: './add-stocks.component.html',
  styleUrls: ['./add-stocks.component.scss'],
})
export class AddStocksComponent implements OnInit {
  dosageStocks = new Array<any>();
  userToken: UserToken = {
    token: '',
    id: 0,
    user: '',
    role: '',
  };

  dosage: string = '';
  stocks: number = 0;
  dosageId: number = 0;
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddStocksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventories,
    private inventoriesService: InventoriesService,
    private auth: AuthService
  ) {}
  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
    this.dosage = this.data.dosage![0].dosage;
    this.dosageId = this.data.dosage![0].id;
  }

  addDosage(dosageIndex: number) {
    for (let index = 0; index < this.data.dosage!.length; index++) {
      if (dosageIndex === index) {
        this.dosage = this.data.dosage![index].dosage;
        this.dosageId = this.data.dosage![index].id ?? 0;
        console.log(this.data.dosage![index]);
      }
    }
  }

  async addStocks() {
    if (this.dosage !== '' && +this.stocks !== 0) {
      await this.spinner.show();
      this.inventoriesService
        .addStocks(
          { stocks: this.stocks, dosage: this.dosageId },
          this.userToken.token
        )
        .subscribe(
          (response) => {
            this.spinner.hide();
            this.dialogRef.close(true);
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: err,
              timer: 1500,
            });
            console.log(err);
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: `Please don't leave a field empty`,
        timer: 1500,
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
