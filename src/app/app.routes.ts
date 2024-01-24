import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManagementComponent } from './pages/management/management.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    // redirectTo: 'dashboard',
    component: AppComponent,
    // pathMatch: 'full',
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'management',
        component: ManagementComponent
      }
    ]
  }
];
