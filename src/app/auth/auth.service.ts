import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from './auth.queries';
import { Router } from '@angular/router';

interface LoginVariables {
  email: string;
  password: string;
}

interface SignupVariables {
  userName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apollo: Apollo,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.apollo.mutate<{ login: { id: string } }, LoginVariables>({
      mutation: LOGIN_MUTATION,
      variables: { email, password }
    });
  }

  signup(userName: string, email: string, password: string) {
    return this.apollo.mutate<{ signup: { id: string } }, SignupVariables>({
      mutation: SIGNUP_MUTATION,
      variables: { userName, email, password }
    });
  }
}