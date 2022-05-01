import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCalendarComponent } from './business-calendar/business-calendar.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';

const routes: Routes = [
  { path: '', component: BusinessHomeComponent },
  { path: 'signup', component: BusinessSignupComponent },
  { path: 'dashboard', component: BusinessDashboardComponent },
  { path: 'calendar', component: BusinessCalendarComponent },
  { path: 'profile', component: BusinessProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessHomeRoutingModule { }
