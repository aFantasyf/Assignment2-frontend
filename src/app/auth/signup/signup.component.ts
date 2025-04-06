import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

interface SignupResponse {
  signup: {
    id: string;
    userName: string;
    email: string;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    userName: new FormControl('', Validators.required),
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
    if (this.signupForm.valid && !this.loading) {
      this.loading = true;
      this.errorMessage = undefined;
      
      const { userName, email, password } = this.signupForm.value;
      
      this.authService.signup(userName!, email!, password!).subscribe({
        next: (res) => {
          const data = res.data as SignupResponse;
          localStorage.setItem('token', data.signup.id);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message || 'Signup failed';
        },
        complete: () => this.loading = false
      });
    }
  }
}