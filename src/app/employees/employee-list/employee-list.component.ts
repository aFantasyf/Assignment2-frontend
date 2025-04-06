import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';


interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  designation: string;
  department: string;
}

interface GetEmployeesResponse {
  getEmployees: Employee[];
}

interface SearchEmployeesResponse {
  getEmployeeByDep: Employee[];
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  displayedColumns = ['name', 'email', 'designation', 'actions'];
  employees: Employee[] = [];
  searchDepartment = '';
  searchDesignation = '';

  constructor(
    private employeeService: EmployeeService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: ApolloQueryResult<GetEmployeesResponse>) => {
        this.employees = res.data.getEmployees;
      }
    });
  }

  search() {
    this.employeeService.searchEmployees({
      department: this.searchDepartment,
      designation: this.searchDesignation
    }).subscribe({
      next: (res: ApolloQueryResult<SearchEmployeesResponse>) => {
        this.employees = res.data.getEmployeeByDep;
      }
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees()
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}