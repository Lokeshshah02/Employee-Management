import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(emp: Employee) {
    emp.id = Date.now();
    emp.avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
    this.employees.push(emp);
    this.employeesSubject.next(this.employees);
  }

  updateEmployee(emp: Employee) {
    const index = this.employees.findIndex(e => e.id === emp.id);
    if (index > -1) {
      this.employees[index] = emp;
      this.employeesSubject.next(this.employees);
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next(this.employees);
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }
}
