import { AccessControlSystem } from '@utopiksandcastle/accesscontrol-api-client';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AccessControlSystemComponent } from '../../elements/access-control-system/access-control-system.component';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AccessControlSystemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: []
})
export class DashboardComponent implements OnInit {
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
