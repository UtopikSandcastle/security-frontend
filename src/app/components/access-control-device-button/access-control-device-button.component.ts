import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  AccessControlDevice,
  AccessControlDeviceType,
} from "@utopiksandcastle/accesscontrol-api-client";

@Component({
  selector: "app-access-control-device-button",
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, MatButtonModule],
  templateUrl: "./access-control-device-button.component.html",
  styleUrl: "./access-control-device-button.component.scss",
})
export class AccessControlDeviceButtonComponent implements OnInit {
  @Input() accessControlDevice!: AccessControlDevice;

  AccessControlDeviceType = AccessControlDeviceType;
  accessControlDeviceLock!: boolean;

  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
  }

  ngOnInit(): void {}
}
