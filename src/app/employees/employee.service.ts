import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { 
  GET_EMPLOYEES, 
  GET_EMPLOYEE,
  SEARCH_EMPLOYEES, 
  CREATE_EMPLOYEE, 
  UPDATE_EMPLOYEE, 
  DELETE_EMPLOYEE 
} from './employee.queries';
import { ApolloQueryResult } from '@apollo/client/core';

interface Employee {
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

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private apollo: Apollo) {}

// Add to EmployeeService
getEmployee(id: string) {
  return this.apollo.query<{ getEmployee: Employee }>({
    query: GET_EMPLOYEE,
    variables: { id }
  });
}

  // Get all employees
  getEmployees() {
    return this.apollo.query<{ getEmployees: Employee[] }>({
      query: GET_EMPLOYEES,
      fetchPolicy: 'network-only'
    });
  }

  // Search employees
  searchEmployees(filters: { department?: string; designation?: string; }) {
    return this.apollo.query<{ getEmployeeByDep: Employee[] }>({
      query: SEARCH_EMPLOYEES,
      variables: filters
    });
  }

 // Update methods to return direct observables
createEmployee(employee: Omit<Employee, 'id'>) {
  return this.apollo.mutate({
    mutation: CREATE_EMPLOYEE,
    variables: employee
  });
}

updateEmployee(id: string, employee: Partial<Employee>) {
  return this.apollo.mutate({
    mutation: UPDATE_EMPLOYEE,
    variables: { id, ...employee }
  });
}

  // Delete employee
  deleteEmployee(id: string) {
    return this.apollo.mutate<{ deleteEmployee: { id: string } }>({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    });
  }
}