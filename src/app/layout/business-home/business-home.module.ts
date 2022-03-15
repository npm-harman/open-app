import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessHomeRoutingModule } from './business-home-routing.module';
import { BusinessHomeComponent } from './business-home.component';


@NgModule({
  declarations: [
    BusinessHomeComponent
  ],
  imports: [
    CommonModule,
    BusinessHomeRoutingModule
  ]
})
export class BusinessHomeModule { }
