import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdGridComponent } from '../components/ad-grid/ad-grid/ad-grid.component';
import { AdGridItemComponent } from '../components/ad-grid-item/ad-grid-item/ad-grid-item.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    AdGridComponent,
    AdGridItemComponent,
    AdDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
  ],
})
export class HomeModule {}
