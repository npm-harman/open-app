import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { UserSignupPopupComponent } from './components/user-signup-popup/user-signup-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninPopupComponent } from './components/signin-popup/signin-popup.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, UserSignupPopupComponent, SigninPopupComponent],
  imports: [CommonModule, LayoutRoutingModule, ReactiveFormsModule],
})
export class LayoutModule {}
