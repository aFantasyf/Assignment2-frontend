import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../shared/models/employee.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,MatIconModule ],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee?: Employee;
  loading = true;
  errorMessage?: string;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(id).subscribe({
      next: (res) => {
        this.employee = res.data.getEmployee;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load employee details';
        this.loading = false;
      }
    });
  }
}