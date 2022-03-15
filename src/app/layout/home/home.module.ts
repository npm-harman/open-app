import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdGridComponent } from '../components/ad-grid/ad-grid/ad-grid.component';
import { AdGridItemComponent } from '../components/ad-grid-item/ad-grid-item/ad-grid-item.component';

@NgModule({
  declarations: [HomeComponent, AdGridComponent, AdGridItemComponent],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
