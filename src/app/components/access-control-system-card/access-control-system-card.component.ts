import { Component, Input, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../api.service";
import {
  AccessControlSystem,
  AccessControlDevice,
} from "@utopiksandcastle/accesscontrol-api-client";
import { AccessControlDeviceButtonComponent } from "../access-control-device-button/access-control-device-button.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-access-control-system-card",
  standalone: true,
  imports: [MatButtonModule, MatCardModule, AccessControlDeviceButtonComponent],
  templateUrl: "./access-control-system-card.component.html",
  styleUrl: "./access-control-system-card.component.scss",
  providers: [ApiService],
})
export class AccessControlSystemCardComponent implements OnInit {
  @Input() accessControlSystem: AccessControlSystem | undefined;

  accessControlDevices: AccessControlDevice[] = [];
  

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.accessControlSystem?.AccessControlDeviceIds?.forEach((id) => {
      this.apiService.accesControleDeviceService.apiV1AccessControlDeviceIdGet(id).subscribe({
        next: (value) => {
          this.accessControlDevices.push(value);
        },
        error: (error) => console.error(error),
        complete: () => console.info(`${this.accessControlSystem?.Name} System's device loaded`),
      });
    });
  }
}
