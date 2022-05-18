import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessSignupService } from 'src/app/layout/business-home/business-signup/business-signup-form/business-signup.service';
import { AppToastService } from 'src/app/utils/app-toast.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  form: FormGroup;
  subscription: any;
  currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private businessSignupService: BusinessSignupService,
    private appToastService: AppToastService
  ) {}

  ngOnInit(): void {
    this.subscription = this.businessSignupService
      .getCurrentUser()
      .subscribe((value) => {
        this.currentUser = value;
      });
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
    });
  }

  onSubmit() {
    const formData = this.form.value;
    delete formData.confirmPassword;
    this.businessSignupService
      .changePassword(
        this.form.value,
        this.currentUser.uId || this.currentUser.id
      )
      .subscribe((res) => {
        this.onCancel();
        this.showSuccess();
      });
  }

  onCancel() {
    this.form.get('password')?.setValue(null);
    this.form.get('confirmPassword')?.setValue(null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isPasswordMatching() {
    if (this.form.get('confirmPassword')?.dirty) {
      return (
        this.form.get('password')?.value ===
        this.form.get('confirmPassword')?.value
      );
    }
    return true;
  }

  showSuccess() {
    this.appToastService.show({
      message: 'Password updated!',
      class: 'bg-success text-light',
      delay: 10000,
    });
  }
}
