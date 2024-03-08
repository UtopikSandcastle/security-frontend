import { AccessControlSystemComponent, AccessControlSystemComponentType } from "@utopiksandcastle/accesscontrol-api-client";
import { AccessControlSystemComponentDialogComponent } from "../access-control-system-component-dialog/access-control-system-component-dialog.component";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-access-control-system-component-button",
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, MatButtonModule],
  templateUrl: "./access-control-system-component-button.component.html",
  styleUrl: "./access-control-system-component-button.component.scss",
})
export class AccessControlSystemComponentButtonComponent {
  @Input() accessControlSystemComponent!: AccessControlSystemComponent;

  AccessControlSystemComponentType = AccessControlSystemComponentType;

  constructor(public dialog: MatDialog) {}

  openDialog(accessControlSystemComponent: AccessControlSystemComponent) {
    this.dialog.open(AccessControlSystemComponentDialogComponent, {
      width: "300px",
      data: {
        accessControlSystemComponent: accessControlSystemComponent,
      },
    });
  }
}
