import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessHomeRoutingModule } from './business-home-routing.module';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';
import { BusinessSignupFormComponent } from './business-signup/business-signup-form/business-signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { BusinessCalendarComponent } from './business-calendar/business-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from './business-calendar/calendar-header/calendar-header.component';

@NgModule({
  declarations: [
    BusinessHomeComponent,
    BusinessSignupComponent,
    BusinessSignupFormComponent,
    BusinessDashboardComponent,
    BusinessCalendarComponent,
    CalendarHeaderComponent
  ],
  imports: [
    CommonModule,
    BusinessHomeRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class BusinessHomeModule { }
