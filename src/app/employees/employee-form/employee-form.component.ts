import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  designation: string;
  salary: number;
  department: string;
  employee_photo: string;
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employeeForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    last_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    designation: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    department: new FormControl('', [Validators.required]),
    employee_photo: new FormControl('')
  });

  isEdit = false;
  employeeId?: string;
  loading = false;
  errorMessage?: string;
  departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];
  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.loadEmployeeData();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEmployeeData() {
    this.loading = true;
    this.employeeService.getEmployee(this.employeeId!) // Changed to getEmployee
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const employee = res.data.getEmployee;
          this.employeeForm.patchValue({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender || '',
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
            employee_photo: employee.employee_photo || ''
          });
          this.loading = false;
        },
        error: (err: Error) => { // Added error type
          this.errorMessage = err.message || 'Failed to load employee data';
          this.loading = false;
        }
      });
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.employeeForm.patchValue({ 
          employee_photo: reader.result as string 
        });
      };
      reader.readAsDataURL(file);
    }
  }

  
  // Update onSubmit method to handle null values
  onSubmit() {
    if (this.employeeForm.invalid || this.loading) return;
    if (this.employeeForm.invalid || this.loading) return;

    this.loading = true;
    this.errorMessage = undefined;
    
    // Convert form values to proper types
    const employeeData: Partial<Employee> = {
      first_name: this.employeeForm.value.first_name!,
      last_name: this.employeeForm.value.last_name!,
      email: this.employeeForm.value.email!,
      gender: this.employeeForm.value.gender || undefined,
      designation: this.employeeForm.value.designation!,
      salary: this.employeeForm.value.salary!,
      department: this.employeeForm.value.department!,
      employee_photo: this.employeeForm.value.employee_photo || undefined
    };
  
    const operation = this.isEdit && this.employeeId
    ? this.employeeService.updateEmployee(this.employeeId, employeeData)
    : this.employeeService.createEmployee(employeeData as Omit<Employee, 'id'>);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/employees']);
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Operation failed. Please try again.';
        this.loading = false;
      }
    });
  }
}