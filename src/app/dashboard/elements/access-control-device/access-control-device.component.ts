import { Component, Input } from '@angular/core';
import { AccessControlDevice } from '@utopiksandcastle/accesscontrol-api-client';
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-access-control-device',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatRadioModule],
  templateUrl: './access-control-device.component.html',
  styleUrl: './access-control-device.component.scss'
})
export class AccessControlDeviceComponent {
  @Input() accessControlDevice: AccessControlDevice | undefined
}
