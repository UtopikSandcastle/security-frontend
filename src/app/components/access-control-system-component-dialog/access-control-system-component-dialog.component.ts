import { AccessControlSystemComponent } from "@utopiksandcastle/accesscontrol-api-client";
import { ApiService } from "../../api.service";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-access-control-system-component-dialog",
  standalone: true,
  imports: [],
  templateUrl: "./access-control-system-component-dialog.component.html",
  styleUrl: "./access-control-system-component-dialog.component.scss",
})
export class AccessControlSystemComponentDialogComponent {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AccessControlSystemComponentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      accessControlSystemComponent: AccessControlSystemComponent;
    }
  ) {}
}
