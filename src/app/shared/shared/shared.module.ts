import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffListItemComponent } from './staff-list-item/staff-list-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipe } from './safe-url.pipe';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceListItemComponent } from './service-list-item/service-list-item.component';
import { BusinessHoursComponent } from './business-hours/business-hours.component';



@NgModule({
  declarations: [
    StaffListComponent,
    StaffListItemComponent,
    SafeUrlPipe,
    ServiceListComponent,
    ServiceListItemComponent,
    BusinessHoursComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports:[
    StaffListComponent,
    StaffListItemComponent,
    NgbModule,
    ReactiveFormsModule,
    ServiceListComponent,
    ServiceListItemComponent,
    BusinessHoursComponent
  ]
})
export class SharedModule { }
