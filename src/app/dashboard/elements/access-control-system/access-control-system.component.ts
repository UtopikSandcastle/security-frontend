import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AccessControlDevice, AccessControlDeviceService, AccessControlSystem } from '@utopiksandcastle/accesscontrol-api-client';
import { MatButtonModule } from "@angular/material/button";
import { AccessControlDeviceComponent } from '../access-control-device/access-control-device.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-access-control-system',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, AccessControlDeviceComponent],
  templateUrl: './access-control-system.component.html',
  styleUrl: './access-control-system.component.scss',
  providers: [AccessControlDeviceService]
})
export class AccessControlSystemComponent implements OnInit {
  @Input() accessControlSystem: AccessControlSystem | undefined;

  accessControlDevices: AccessControlDevice[] = []

  constructor(private accesControleDeviceService: AccessControlDeviceService) {
    accesControleDeviceService.configuration.basePath = environment.apiBaseUrl;
  }

  ngOnInit(): void {
    this.accessControlSystem?.AccessControlDeviceIds?.forEach(id => {
      this.accesControleDeviceService.apiV1AccessControlDeviceIdGet(id).subscribe({
        next: (value) => { this.accessControlDevices.push(value) },
        error: (error) => console.error(error),
        complete: () => console.info(`${this.accessControlSystem?.Name} System's device loaded`)
      })
    })
  }
}
