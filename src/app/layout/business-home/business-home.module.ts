import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessHomeRoutingModule } from './business-home-routing.module';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';
import { BusinessSignupFormComponent } from './business-signup/business-signup-form/business-signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { BusinessCalendarComponent } from './business-calendar/business-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from './business-calendar/calendar-header/calendar-header.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    BusinessHomeComponent,
    BusinessSignupComponent,
    BusinessSignupFormComponent,
    BusinessDashboardComponent,
    BusinessCalendarComponent,
    CalendarHeaderComponent,
    BusinessProfileComponent,
  ],
  imports: [
    CommonModule,
    BusinessHomeRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    SharedModule,
  ]
})
export class BusinessHomeModule { }
