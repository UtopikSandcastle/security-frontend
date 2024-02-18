import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { DialogAction, DialogOutput, DynamicDialog } from "@utopikgoodies/dynamic-form";
import { AccessControlSystem } from "@utopiksandcastle/accesscontrol-api-client";
import { DynamicFormService } from "../../dynamic-form.service";
import { ApiService } from "../../api.service";

// export enum Action {
//   Create = "Create",
//   Update = "Update",
// }

@Component({
  selector: "app-access-control-system-button-crud",
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: "./access-control-system-button-crud.component.html",
  styleUrl: "./access-control-system-button-crud.component.scss",
})
export class AccessControlSystemButtonCrudComponent {
  // pageTitle = "Access Control System";
  // action = Action.Create;

  constructor(
    // public dialog: MatDialog,
    private dynamicFormService: DynamicFormService
    // private apiService: ApiService
  ) {}

  openDialog() {
    this.dynamicFormService.openAccessControlSystemDialog().subscribe({
      error: (error) => console.error(error),
    });
  }

  // async openDialogCRUD(accessControlSystem: AccessControlSystem | undefined = undefined) {
  //   if (accessControlSystem) {
  //     this.action = Action.Update;
  //   } else {
  //     this.action = Action.Create;
  //   }

  //   const dialogRef = this.dialog.open(DynamicDialog, {
  //     disableClose: true,
  //     width: "90%",
  //     data: {
  //       title: `Create a new ${this.pageTitle}`,
  //       buttonActionText: this.action,
  //       buttonDelete: this.action == Action.Update,
  //       dynFormFields: this.dynamicFormService.generateAccessControlSystemForm(accessControlSystem),
  //     },
  //   });
  // }
}
