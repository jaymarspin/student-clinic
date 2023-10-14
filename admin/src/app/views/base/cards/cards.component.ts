import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddStudentComponent } from '../add-student/add-student.component';
import { MedicinesComponent } from '../medicines/medicines.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudentService } from 'src/app/services/student/student.service';
import { UserToken } from 'src/app/interfaces/user.interface';
import { Student, StudentDialogData } from 'src/app/interfaces/student.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit{
  userToken: UserToken ={
    token: '',
    id: 0,
    user: '',
    role: '',
  }
  students: Student[] = new Array<Student>()
  constructor(
    public matdialog: MatDialog,
    private auth: AuthService,
    public studentService: StudentService,
    private spinner: NgxSpinnerService
  ) {}

  async deleteStudent(student: Student){
   const confirm =  await Swal.fire({
      title: `Are you sure you want to delete ${student.fullname}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }) 
    if(confirm.isConfirmed){
      await this.spinner.show()
      this.studentService.deleteStudent(student,this.userToken.token).subscribe(async response =>{
        this.spinner.hide()
        if(response.affected > 0){
          await Swal.fire({
            icon: 'info',
            title: 'Student Successfully Deleted',
            timer: 2500,
         
          })
          this.getStudents()
        }else{
          await Swal.fire({
            icon: 'info',
            title: 'Record already dont exist'
          })
        }
      },error =>{
        this.spinner.hide()
        Swal.fire({
          icon: 'error',
          title: error
        })
      })
    }
   
  }

  async ngOnInit(): Promise<void> {
    this.userToken = await this.auth.init();
    this.getStudents()
 

  }

  async addStudent(edit: boolean) {
    let dialog = this.matdialog.open(AddStudentComponent, {
      width: '60%',
      height: '70%',
      data: {
        edit
      }
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

  async editStudent(student: Student) {
    let dialog = this.matdialog.open(AddStudentComponent, {
      width: '60%',
      height: '70%',
      data: {
        edit: true,
        student: student
      } as StudentDialogData,

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
      console.log(this.students)
  
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

  viewMedicines(student: Student) {
    let dialog = this.matdialog.open(MedicinesComponent, {
      width: '60%',
      height: '60%',
      data: student
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
