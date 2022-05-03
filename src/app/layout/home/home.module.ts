import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdGridComponent } from '../components/ad-grid/ad-grid/ad-grid.component';
import { AdGridItemComponent } from '../components/ad-grid-item/ad-grid-item/ad-grid-item.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    AdGridComponent,
    AdGridItemComponent,
    AdDetailsComponent,
  ],
  imports: [
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class HomeModule {}
