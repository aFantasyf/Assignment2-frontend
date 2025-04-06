import { gql } from 'apollo-angular';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      department
      employee_photo
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      department
      employee_photo
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query GetEmployeeByDep($department: String, $designation: String) {
    getEmployeeByDep(department: $department, designation: $designation) {
      id
      first_name
      last_name
      email
      designation
      department
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $gender: String,
    $designation: String!,
    $salary: Float!,
    $department: String!,
    $employee_photo: String
  ) {
    createEmployee(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      department: $department,
      employee_photo: $employee_photo
    ) {
      id
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!,
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $gender: String,
    $designation: String!,
    $salary: Float!,
    $department: String!
  ) {
    updateEmployee(
      id: $id,
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      department: $department
    ) {
      id
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;