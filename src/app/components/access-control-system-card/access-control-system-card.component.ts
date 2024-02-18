import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../api.service";
import {
  AccessControlSystem,
  AccessControlDevice,
} from "@utopiksandcastle/accesscontrol-api-client";
import { AccessControlDeviceButtonComponent } from "../access-control-device-button/access-control-device-button.component";
import { MatIconModule } from "@angular/material/icon";
import { DynamicFormService } from "../../dynamic-form.service";

@Component({
  selector: "app-access-control-system-card",
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, AccessControlDeviceButtonComponent],
  templateUrl: "./access-control-system-card.component.html",
  styleUrl: "./access-control-system-card.component.scss",
  providers: [ApiService],
  encapsulation: ViewEncapsulation.None,
})
export class AccessControlSystemCardComponent implements OnInit {
  @Input() accessControlSystem: AccessControlSystem | undefined;
  
  isMouseOver = false;
  accessControlDevices: AccessControlDevice[] = [];

  constructor(
    private apiService: ApiService,
    private dynamicFormService: DynamicFormService
  ) {}

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

  onMouseEnter() {
    this.isMouseOver = true;
    // Additional logic when mouse enters the card
  }

  onMouseLeave() {
    this.isMouseOver = false;
    // Additional logic when mouse leaves the card
  }

  openAccessControlSystemDialog(accessControlSystem: AccessControlSystem | undefined = undefined) {
    this.dynamicFormService.openAccessControlSystemDialog(accessControlSystem).subscribe({
      next: (value) => console.debug(value),
      error: (error) => console.error(error),
      complete: () => {
        // this.loadData();
      },
    });
  }
}
