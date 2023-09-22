export interface User {
    fullname: string;
    username: string;
    role: string;
    password: string;
    active?: boolean;
    created_at?: string;
    id?: number
   
  }
  
  export interface UserLogin {
    username: string;
    password: string;
  }
  
  export interface UserToken {
    token: string;
    id: number;
    user: string,
    role?: string
  }
  