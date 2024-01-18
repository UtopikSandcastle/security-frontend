import { AccessControlSystem, AccessControlSystemService } from '@utopiksandcastle/accesscontrol-api-client';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AccessControlSystemComponent } from './elements/access-control-system/access-control-system.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AccessControlSystemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [AccessControlSystemService]
})
export class DashboardComponent implements OnInit {
  accessControlSystems: AccessControlSystem[] = []

  constructor(private accesControleSystemService: AccessControlSystemService) {
    accesControleSystemService.configuration.basePath = environment.apiBaseUrl;
  }

  ngOnInit(): void {
    this.accesControleSystemService.apiV1AccessControlSystemGet().subscribe({
      next: (value) => { this.accessControlSystems = value },
      error: (error) => console.error(error),
      complete: () => console.info(`${this.accessControlSystems.length} Access Control Systems loaded.`)
    })
  }
}
