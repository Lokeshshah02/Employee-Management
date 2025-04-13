import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls :['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(emp => {
      this.employees = emp;
    });
  }

  edit(emp: Employee) {
    this.router.navigate(['/employees', emp.id, 'edit']); 
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employees.filter(emp => emp.id !== id);
    }
  }
}
