import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'employees',
    canActivate: [authGuard],
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'new', component: EmployeeFormComponent },
      { path: ':id', component: EmployeeDetailsComponent },
      { path: 'edit/:id', component: EmployeeFormComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login
  { path: '**', redirectTo: 'login' }
];