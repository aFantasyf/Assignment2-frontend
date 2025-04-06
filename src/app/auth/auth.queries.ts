import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      userName
      email
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($userName: String!, $email: String!, $password: String!) {
    signup(userName: $userName, email: $email, password: $password) {
      id
      userName
      email
    }
  }
`;