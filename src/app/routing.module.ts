import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { PrincipalMenuComponent } from './principal-menu.component';


const appRoutes: Routes = [
    { path: 'init', component: AppComponent },
    { path: 'menu', component: PrincipalMenuComponent }
  // { path: '', redirectTo: '/init', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
