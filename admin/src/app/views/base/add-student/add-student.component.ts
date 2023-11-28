import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { Student, StudentDialogData } from '../../../interfaces/student.interface';
import { StudentService } from '../../../services/student/student.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserToken } from '../../../interfaces/user.interface';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit{
  student: Student = {
    fullname: '',
    email: '',
    grade: '',
    notes: '',
    emergencyContactNo: '',
    date_added: null,
    graderole: '', 
  };
  constructor(
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<AddStudentComponent>, 
    public studentService: StudentService,
    private auth: AuthService,
    public matdialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: StudentDialogData
  ) {}
  ngOnInit(): void {
    if(this.data.edit){
      this.student = this.data.student ?? this.student
    }
  }
    


  
  async add() {


    await this.spinner.show();
    const userToken: UserToken = await this.auth.init();
    console.log(this.student)
    this.studentService
      .addStudent(this.student, userToken.token)
      .subscribe((response) => { 
        this.dialogRef.close(true)
      },error=>{
        this.dialogRef.close(false)
      });
  }
  async edit() {


    await this.spinner.show();
    const userToken: UserToken = await this.auth.init();
    this.studentService
      .updatePatient(this.student, userToken.token)
      .subscribe((response) => { 
        this.dialogRef.close(true)
      },error=>{
        this.dialogRef.close(false)
      });
  }
 
  close() {
    this.dialogRef.close();
  }
}
