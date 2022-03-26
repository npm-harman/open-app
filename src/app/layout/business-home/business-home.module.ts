import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessHomeRoutingModule } from './business-home-routing.module';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';
import { BusinessSignupFormComponent } from './business-signup/business-signup-form/business-signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BusinessHomeComponent,
    BusinessSignupComponent,
    BusinessSignupFormComponent
  ],
  imports: [
    CommonModule,
    BusinessHomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class BusinessHomeModule { }
