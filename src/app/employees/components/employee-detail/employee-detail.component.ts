import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-employee-detail',
  template: `
    <div *ngIf="employee">
      <img [src]="employee.avatar">
      <h2>{{ employee.name }}</h2>
      <p>{{ employee.designation }}</p>
      <p>{{ employee.companyName }}</p>
      <p>{{ employee.email }}</p>
      <p>{{ employee.contact }}</p>
    </div>
  `
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employee = this.employeeService.getEmployeeById(id);
  }
}
