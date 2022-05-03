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

@NgModule({
  declarations: [
    StaffListComponent,
    StaffListItemComponent,
    SafeUrlPipe,
    ServiceListComponent,
    ServiceListItemComponent,
    BusinessHoursComponent,
    BusinessGeneralComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    ngfModule,
    FormsModule
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
    FormsModule,
    CommonModule,
  ]
})
export class SharedModule { }
