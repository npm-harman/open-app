import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessSignupService } from './business-signup.service';

@Component({
  selector: 'app-business-signup-form',
  templateUrl: './business-signup-form.component.html',
  styleUrls: ['./business-signup-form.component.scss'],
})
export class BusinessSignupFormComponent implements OnInit {
  signupForm: FormGroup;
  formSubmitted = false;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private businessSignupService: BusinessSignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm() {
    let businessHoursForDay = new FormArray([]);
    let staffMembers = new FormArray([]);
    let services = new FormArray([]);
    this.signupForm = this.fb.group({
      user: this.fb.group({
        firstName: [null, [Validators.required, Validators.maxLength(40)]],
        lastName: [null, [Validators.required, Validators.maxLength(40)]],
        emailId: [
          null,
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        phoneNumber: [null, Validators.required],
      }),
      business: this.fb.group({
        bName: [null, [Validators.required, Validators.maxLength(40)]],
        bCity: [null, [Validators.required, Validators.maxLength(40)]],
        bState: [null, [Validators.required, Validators.maxLength(40)]],
        bZip: [null, [Validators.required, Validators.maxLength(40)]],
        bType: [null, [Validators.required, Validators.maxLength(40)]],
      }),
      businessHours: businessHoursForDay,
      staff: staffMembers,
      businessServices: services,
    });
  }

  onCancel() {
    this.router.navigate(['/general/business-home']);
  }

  onSubmit() {
    this.isLoading = true;
    this.businessSignupService
      .registerBusiness(this.signupForm.value)
      .subscribe((res) => {
        this.formSubmitted = true;
        this.isLoading = false;
      });
  }
}
