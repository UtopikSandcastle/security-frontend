import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AccessControlDevice } from "@utopiksandcastle/accesscontrol-api-client";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ApiService } from "../../api.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-access-control-device-dialog",
  standalone: true,
  imports: [MatSlideToggleModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: "./access-control-device-dialog.component.html",
  styleUrl: "./access-control-device-dialog.component.scss",
})
export class AccessControlDeviceDialogComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AccessControlDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      accessControlDevice: AccessControlDevice;
    }
  ) {}

  get inputState(): boolean | undefined {
    return this.data.accessControlDevice?.Inputs?.[1];
  }

  set inputState(value: boolean | undefined) {
    if (!this.data.accessControlDevice.Inputs) {
      this.data.accessControlDevice.Inputs = []; // Initialize if not exists
    }
    this.data.accessControlDevice.Inputs[1] = value as boolean;

    this.apiService.accesControleDeviceService
      .apiV1AccessControlDeviceIdPut(
        this.data.accessControlDevice.Id as string,
        this.data.accessControlDevice
      )
      .subscribe({ next: (value) => console.debug(value), error: (error) => console.error(error) });
  }

  open() {
    if (!this.data.accessControlDevice.Inputs) {
      this.data.accessControlDevice.Inputs = []; // Initialize if not exists
    }
    this.data.accessControlDevice.Inputs[0] = !this.data.accessControlDevice.Inputs[0] as boolean;
    this.apiService.accesControleDeviceService
      .apiV1AccessControlDeviceIdPut(
        this.data.accessControlDevice.Id as string,
        this.data.accessControlDevice
      )
      .subscribe({ next: (value) => console.debug(value), error: (error) => console.error(error) });
  }

  onClose() {
    this.dialogRef.close({ action: this.dialogRef.close });
  }
}
