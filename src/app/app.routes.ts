import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccessControlSystemComponent } from './pages/access-control-system/access-control-system.component';


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
    component: AccessControlSystemComponent
  }
];
