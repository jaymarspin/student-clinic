import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddStudentComponent } from '../add-student/add-student.component';
import { MedicinesComponent } from '../medicines/medicines.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudentService } from 'src/app/services/student/student.service';
import { UserToken } from 'src/app/interfaces/user.interface';
import { Student } from 'src/app/interfaces/student.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit{
 
  students: Student[] = new Array<Student>()
  constructor(
    public matdialog: MatDialog,
    private auth: AuthService,
    public studentService: StudentService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getStudents()
  }

  async addStudent() {
    let dialog = this.matdialog.open(AddStudentComponent, {
      width: '60%',
      height: '70%',
    });
    dialog.afterClosed().subscribe(async (res) => {
      this.spinner.hide()
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Students Successfully added',
          showConfirmButton: false,
          timer: 2500,
          backdrop: false,
        });
        this.getStudents()
      }else if(res === false){
        await Swal.fire({
          icon: 'error',
          title: 'Error Occured',
          showConfirmButton: false,
          timer: 2500,
          backdrop: false,
        });
      }
    });
  }

  async getStudents(){
    await this.spinner.show()
    const userToken: UserToken = await this.auth.init()
    this.studentService.getStudents(userToken.token).subscribe(async response =>{
      await this.spinner.hide()
      this.students = response
  
    },async err=>{
      await this.spinner.hide()
      await Swal.fire({
        icon: 'error',
        title: 'Error Occured',
        showConfirmButton: false,
        timer: 2000,
        backdrop: false,
      });
     
    })
  }

  viewMedicines() {
    let dialog = this.matdialog.open(MedicinesComponent, {
      width: '60%',
      height: '60%',
    });
    dialog.afterClosed().subscribe(async (res) => {
      if (res === true) {
        await Swal.fire({
          icon: 'success',
          title: 'Locations Successfully added',
          showConfirmButton: false,
          timer: 3500,
          backdrop: false,
        });
      }
    });
  }
}
