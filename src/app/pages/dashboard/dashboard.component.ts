import { AccessControlSystem } from '@utopiksandcastle/accesscontrol-api-client';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccessControlSystemComponent } from '../../components/access-control-system/access-control-system.component';
import { ApiService } from '../../api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';

@Component({
  selector: 'app-page-dashboard',
  standalone: true,
  imports: [
    AccessControlSystemComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MenuButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: []
})
export class DashboardComponent implements OnInit {
  pageTitle = "Dashboard";

  accessControlSystems: AccessControlSystem[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.accessControlSystemService.apiV1AccessControlSystemGet().subscribe({
      next: (value) => { this.accessControlSystems = value },
      error: (error) => console.error(error),
      complete: () => console.info(`${this.accessControlSystems.length} Access Control Systems loaded.`)
    })
  }
}
