import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { UserSignupPopupComponent } from './components/user-signup-popup/user-signup-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninPopupComponent } from './components/signin-popup/signin-popup.component';
import { AppToastComponent } from './components/app-toast/app-toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    UserSignupPopupComponent,
    SigninPopupComponent,
    AppToastComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, ReactiveFormsModule, NgbModule],
})
export class LayoutModule {}
