import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
  path: '',
  component: LayoutComponent,
  children: [
  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'business-home', loadChildren: () => import('./business-home/business-home.module').then(m => m.BusinessHomeModule) }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
