import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { AccessControlDeviceComponent } from '../../components/access-control-device/access-control-device.component';

import { ApiService } from '../../api.service';
import { AccessControlSystem, AccessControlDevice } from '@utopiksandcastle/accesscontrol-api-client';

@Component({
  selector: 'app-access-control-system',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, AccessControlDeviceComponent],
  templateUrl: './access-control-system.component.html',
  styleUrl: './access-control-system.component.scss',
  // providers: [AccessControlDeviceService]
  providers: [ApiService]
})
export class AccessControlSystemComponent implements OnInit {
  @Input() accessControlSystem: AccessControlSystem | undefined;

  accessControlDevices: AccessControlDevice[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.accessControlSystem?.AccessControlDeviceIds?.forEach(id => {
      this.apiService.accesControleDeviceService.apiV1AccessControlDeviceIdGet(id).subscribe({
        next: (value) => { this.accessControlDevices.push(value) },
        error: (error) => console.error(error),
        complete: () => console.info(`${this.accessControlSystem?.Name} System's device loaded`)
      })
    })
  }
}
