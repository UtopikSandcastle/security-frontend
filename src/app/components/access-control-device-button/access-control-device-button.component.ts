import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  AccessControlDevice,
  AccessControlDeviceType,
} from "@utopiksandcastle/accesscontrol-api-client";
import { AccessControlDeviceDialogComponent } from "../access-control-device-dialog/access-control-device-dialog.component";

@Component({
  selector: "app-access-control-device-button",
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, MatButtonModule],
  templateUrl: "./access-control-device-button.component.html",
  styleUrl: "./access-control-device-button.component.scss",
})
export class AccessControlDeviceButtonComponent implements OnInit {
  @Input() accessControlDevice!: AccessControlDevice;

  accessControlDeviceLock!: boolean;
  accessControlDeviceType = AccessControlDeviceType;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(accessControlDevice: AccessControlDevice) {
    this.dialog.open(AccessControlDeviceDialogComponent, {
      width: "300px",
      data: {
        accessControlDevice: accessControlDevice,
      },
    });
  }
}
