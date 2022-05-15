import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffListItemComponent } from './staff-list-item/staff-list-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipe } from './safe-url.pipe';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceListItemComponent } from './service-list-item/service-list-item.component';
import { BusinessHoursComponent } from './business-hours/business-hours.component';
import { ngfModule } from "angular-file";
import { BusinessGeneralComponent } from './business-general/business-general.component';
import { AgmCoreModule } from '@agm/core';
import { BusinessContactComponent } from './business-contact/business-contact.component';
import { HourMinPipe } from './pipes/hour-min.pipe';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentListItemComponent } from './appointment-list-item/appointment-list-item.component';

@NgModule({
  declarations: [
    StaffListComponent,
    StaffListItemComponent,
    SafeUrlPipe,
    ServiceListComponent,
    ServiceListItemComponent,
    BusinessHoursComponent,
    BusinessGeneralComponent,
    BusinessContactComponent,
    HourMinPipe,
    AppointmentListComponent,
    AppointmentListItemComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    ngfModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPXKi3ENbv9viH136XKOJYaEPfQd5N6hI',
      libraries: ['places']
    })
  ],
  exports:[
    StaffListComponent,
    StaffListItemComponent,
    NgbModule,
    ReactiveFormsModule,
    ServiceListComponent,
    ServiceListItemComponent,
    BusinessHoursComponent,
    BusinessGeneralComponent,
    BusinessContactComponent,
    FormsModule,
    CommonModule,
    HourMinPipe,
    AppointmentListComponent,
    AppointmentListItemComponent
  ]
})
export class SharedModule { }
