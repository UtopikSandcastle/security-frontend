import { ApiService } from "../../api.service";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { forkJoin } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRippleModule } from "@angular/material/core";
import { MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MenuButtonComponent } from "../../components/menu-button/menu-button.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  AccessControlDevice,
  AccessControlDeviceType,
  AccessControlSystem,
} from "@utopiksandcastle/accesscontrol-api-client";
import { DialogAction, DialogOutput, DynamicDialog } from "@utopikgoodies/dynamic-form";
import { AccessControlDeviceButtonComponent } from "../../components/access-control-device-button/access-control-device-button.component";
import { DynamicFormService } from "../../dynamic-form.service";
import { AccessControlSystemButtonCrudComponent } from "../../components/access-control-system-button-crud/access-control-system-button-crud.component";

export enum Action {
  Create = "Create",
  Update = "Update",
}

@Component({
  selector: "app-access-control-systems",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MenuButtonComponent,
    MatRippleModule,
    MatTooltipModule,
    AccessControlDeviceButtonComponent,
    AccessControlSystemButtonCrudComponent,
  ],
  templateUrl: "./access-control-systems.component.html",
  styleUrl: "./access-control-systems.component.scss",
})
export class AccessControlSystemsComponent {
  pageTitle = "Access Control System";
  action = Action.Create;

  AccessControlDeviceType = AccessControlDeviceType;

  accessControlSystem: AccessControlSystem = {
    Name: "",
    AccessControlDeviceIds: [],
  };

  dataSource: MatTableDataSource<AccessControlSystem> = new MatTableDataSource();
  displayedColumns: string[] = ["name", "accessControlDevices"];

  constructor(
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    private apiService: ApiService,
    private dynamicFormService: DynamicFormService
  ) {
    iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
    this.loadData();
  }

  loadData() {
    let accessControlDevices: AccessControlDevice[] = [];
    let data: AccessControlSystem[] = [];

    const accessControlDeviceObservable =
      this.apiService.accesControleDeviceService.apiV1AccessControlDeviceGet();
    const accessControlSystemObservable =
      this.apiService.accessControlSystemService.apiV1AccessControlSystemGet();

    forkJoin([accessControlDeviceObservable, accessControlSystemObservable]).subscribe({
      next: ([devices, systems]) => {
        accessControlDevices = devices;
        data = systems;
      },
      error: (err) => console.error(err),
      complete: () => {
        this.dataSource.data = data.map((system) => ({
          ...system,
          AccessControlDevices: system.AccessControlDeviceIds?.map((id) =>
            accessControlDevices.find((device) => device.Id === id)
          ),
        }));
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(accessControlSystem: AccessControlSystem) {
    this.dynamicFormService.openAccessControlSystemDialog(accessControlSystem).subscribe({
      next: (value) => console.debug(value),
      error: (error) => console.error(error),
      complete: () => {
        this.loadData();
      },
    });
  }
}
