import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccessControlSystemsComponent } from './pages/access-control-systems/access-control-systems.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'accesscontrolsystem',
    component: AccessControlSystemsComponent
  }
];
