import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { utils, writeFileXLSX } from 'xlsx';
import { UserToken } from 'src/app/interfaces/user.interface';
import * as moment from 'moment';
import { InventoriesService } from 'src/app/services/inventories/inventories.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  templateUrl: 'coreui-icons.component.html',
  providers: [IconSetService],
})
export class CoreUIIconsComponent implements OnInit {
  public icons!: [string, string[]][];
  salesExportExcel!: any[];
  export!: any[];
  userToken: UserToken = {
    token: '',
    id: 0,
    user: '',
    role: '',
  };
  startDate: any;
  endDate: any;
  type: any = 'Medicine Stocks Incoming'
  constructor(
    private route: ActivatedRoute,
    public iconSet: IconSetService,
    private spinner: NgxSpinnerService,
    private inventoriesSrvc: InventoriesService,
    private auth: AuthService
  ) {
    this.startDate = moment().clone().startOf('week');
    this.endDate = moment().add('1', 'minutes');
  }

  async ngOnInit() {
    this.userToken = await this.auth.init();
  }

  async viewReportIncoming() {
 
    await this.spinner.show();
    this.inventoriesSrvc
      .reportIncoming(this.startDate, this.endDate, this.userToken.token)
      .subscribe({
        next: (res) => {
          this.export = res;
          console.log(res);
          this.salesExportExcel = this.export.map((data) => {
            return {
              stocks: data.stocks,

              medicine: data.dosage.inventories.medicinename,
              created_at: data.created_at,
            } as any;
          });
          const worksheet = utils.json_to_sheet<any>(this.salesExportExcel);
          const workbook = utils.book_new();
          utils.book_append_sheet(workbook, worksheet);
          utils.aoa_to_sheet([
            [
              {
                name: `Report(Stock in) ${this.startDate} - ${this.endDate}.xlsx`,
              },
            ],
          ]);

          utils.sheet_add_aoa(
            worksheet,
            [['Incoming Stocks', 'Medicine', 'Date']],
            { origin: 'A1' }
          );
          let objectMaxLength: any[] = [];
          for (let i = 0; i < this.salesExportExcel.length; i++) {
            let value = <any>Object.values(this.salesExportExcel[i]);
            for (let j = 0; j < value.length; j++) {
              if (typeof value[j] == 'number') {
                objectMaxLength[j] = 10;
              } else {
                objectMaxLength[j] =
                  objectMaxLength[j] >= value[j].length
                    ? objectMaxLength[j]
                    : value[j].length;
              }
            }
          }
          var wscols = [
            { width: objectMaxLength[0] },
            { width: objectMaxLength[1] },
            { width: objectMaxLength[2] },
          ];
          worksheet['!cols'] = wscols;
          writeFileXLSX(workbook, `Report(Stock in) ${this.startDate} - ${this.endDate}.xlsx`, { compression: false });
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  async viewReportOutcoming() {
 
    await this.spinner.show();
    this.inventoriesSrvc
      .reportOutcoming(this.startDate, this.endDate, this.userToken.token)
      .subscribe({
        next: (res) => {
          this.export = res; 
          console.log(res)
          this.salesExportExcel = this.export.map((data) => {
            return {
              stocks: data.quantity,

              medicine: data.inventories.medicinename,
              created_at: data.created_at,
              student: data.student.fullname,
              email: data.student.email,
              grade: data.student.grade
            } as any;
          });
          const worksheet = utils.json_to_sheet<any>(this.salesExportExcel);
          const workbook = utils.book_new();
          utils.book_append_sheet(workbook, worksheet);
          utils.aoa_to_sheet([
            [
              {
                name: `Report(Medicines) ${this.startDate} - ${this.endDate}.xlsx`,
              },
            ],
          ]);

          utils.sheet_add_aoa(
            worksheet,
            [['Outcoming Stocks', 'Medicine', 'Date','Patient','Email','Grade-Year/Personel']],
            { origin: 'A1' }
          );
          let objectMaxLength: any[] = [];
          for (let i = 0; i < this.salesExportExcel.length; i++) {
            let value = <any>Object.values(this.salesExportExcel[i]);
            for (let j = 0; j < value.length; j++) {
              if (typeof value[j] == 'number') {
                objectMaxLength[j] = 10;
              } else {
                objectMaxLength[j] =
                  objectMaxLength[j] >= value[j].length
                    ? objectMaxLength[j]
                    : value[j].length;
              }
            }
          }
          var wscols = [
            { width: objectMaxLength[0] },
            { width: objectMaxLength[1] },
            { width: objectMaxLength[2] },
            { width: objectMaxLength[3] },
            { width: objectMaxLength[4] },
            { width: objectMaxLength[5] },
          ];
          worksheet['!cols'] = wscols;
          writeFileXLSX(workbook, `Report(Medicines) ${this.startDate} - ${this.endDate}.xlsx`, { compression: false });
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  viewReport(){ 
    if(this.type === 'Medicine Stocks Incoming'){
      this.viewReportIncoming()
    }else if(this.type === 'Medicine stocks Outgoing'){
      this.viewReportOutcoming()
    }else if(this.type === 'Injuries'){
      this.injuriesReport()
    }
  }


  async injuriesReport() {
 
    await this.spinner.show();
    this.inventoriesSrvc
      .injuriesReport(this.startDate, this.endDate, this.userToken.token)
      .subscribe({
        next: (res) => {
          this.export = res; 
          console.log(res)
          this.salesExportExcel = this.export.map((data) => {
            return {
              description: data.description,

              action: data.action,
              date: data.date ?? '',
              student: data.student.fullname,
              email: data.student.email,
              grade: data.student.grade
            } as any;
          });
          const worksheet = utils.json_to_sheet<any>(this.salesExportExcel);
          const workbook = utils.book_new();
          utils.book_append_sheet(workbook, worksheet);
          utils.aoa_to_sheet([
            [
              {
                name: `Report(Injuries) ${this.startDate} - ${this.endDate}.xlsx`,
              },
            ],
          ]);

          utils.sheet_add_aoa(
            worksheet,
            [['Description', 'Action', 'Date Admitted','Patient','Email','Grade-Year/Personel']],
            { origin: 'A1' }
          );
          let objectMaxLength: any[] = [];
          for (let i = 0; i < this.salesExportExcel.length; i++) {
            let value = <any>Object.values(this.salesExportExcel[i]);
            for (let j = 0; j < value.length; j++) {
              if (typeof value[j] == 'number') {
                objectMaxLength[j] = 10;
              } else {
                objectMaxLength[j] =
                  objectMaxLength[j] >= value[j].length
                    ? objectMaxLength[j]
                    : value[j].length;
              }
            }
          }
          var wscols = [
            { width: objectMaxLength[0] },
            { width: objectMaxLength[1] },
            { width: objectMaxLength[2] },
            { width: objectMaxLength[3] },
            { width: objectMaxLength[4] },
            { width: objectMaxLength[5] },
          ];
          worksheet['!cols'] = wscols;
          writeFileXLSX(workbook, `Report(Injuries) ${this.startDate} - ${this.endDate}.xlsx`, { compression: false });
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
