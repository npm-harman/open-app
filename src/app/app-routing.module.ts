import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: ':domain', 
  loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) 
  },
  { path: ':domain/not-found', 
  loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  { path: '', redirectTo: 'general', pathMatch: 'full' },
  { path: '**', redirectTo: 'general/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
