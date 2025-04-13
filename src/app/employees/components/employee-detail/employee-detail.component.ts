import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',  
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.employee = this.employeeService.getEmployeeById(id);

    if (!this.employee) {
      this.router.navigate(['/employees']);
    }
  }

  goBack(): void {
    window.history.back(); 
  }
}
