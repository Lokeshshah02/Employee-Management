import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.services';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'] 
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  currentId: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      designation: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.currentId = +id;
      const emp = this.employeeService.getEmployeeById(this.currentId);
      if (emp) {
        this.form.patchValue(emp);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const employee = { ...this.form.value } as Employee;
      if (this.isEdit) {
        employee.id = this.currentId;
        employee.avatar = this.employeeService.getEmployeeById(this.currentId)?.avatar || '';
        this.employeeService.updateEmployee(employee);
      } else {
        this.employeeService.addEmployee(employee);
      }
      this.router.navigate(['/employees']);
    }
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/employees']);
  }
}
