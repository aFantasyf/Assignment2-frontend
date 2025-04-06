import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

// Add interface for the response data
interface LoginResponse {
  login: {
    id: string;
    userName: string;
    email: string;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  loading = false;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.errorMessage = undefined;
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: (res) => {
          // Type assertion based on our interface
          const data = res.data as LoginResponse;
          localStorage.setItem('token', data.login.id);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message || 'Login failed';
        },
        complete: () => this.loading = false
      });
    }
  }
}