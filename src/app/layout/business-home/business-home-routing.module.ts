import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';

const routes: Routes = [
  { path: '', component: BusinessHomeComponent },
  { path: 'signup', component: BusinessSignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessHomeRoutingModule { }
