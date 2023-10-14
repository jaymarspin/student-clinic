export interface Student {
    fullname: string;
    email: string;
    grade: string;
    notes?: string;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
    id?: number;
    emergencyContactNo: string
    date_added: any
   
  }

  export interface StudentDialogData {
    student?: Student
    edit: boolean
   
  }
  
  