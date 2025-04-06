export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender?: string;
    designation: string;
    salary: number;
    department: string;
    employee_photo?: string;
  }