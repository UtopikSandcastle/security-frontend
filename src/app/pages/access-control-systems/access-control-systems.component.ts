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
  AccessControlSystem,
} from "@utopiksandcastle/accesscontrol-api-client";
import { DynamicFormService } from "../../dynamic-form.service";
import { AccessControlSystemComponentButtonComponent } from "../../components/access-control-system-component-button/access-control-system-component-button.component";

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
    AccessControlSystemComponentButtonComponent
  ],
  templateUrl: "./access-control-systems.component.html",
  styleUrl: "./access-control-systems.component.scss",
})
export class AccessControlSystemsComponent {
  pageTitle = "Access Control System";
  action = Action.Create;

  // accessControlSystem: AccessControlSystem = {
  //   Name: "",
  // };

  dataSource: MatTableDataSource<AccessControlSystem> = new MatTableDataSource();
  displayedColumns: string[] = ["name", "Components", "actions"];

  mouseOverRow: any;

  constructor(
    // public dialog: MatDialog,
    // iconRegistry: MatIconRegistry,
    private apiService: ApiService,
    private dynamicFormService: DynamicFormService
  ) {
    // iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
    this.loadData();
  }

  loadData() {
    let accessControlSystems: AccessControlSystem[] = [];

    this.apiService.accessControlSystemService.apiV1AccessControlSystemGet().subscribe({
      next: (systems) => accessControlSystems.push(...systems),
      error: (error) => console.error(error),
      complete: () => (this.dataSource.data = accessControlSystems),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAccessControlSystemDialog(accessControlSystem: AccessControlSystem | undefined = undefined) {
    this.dynamicFormService.openAccessControlSystemDialog(accessControlSystem).subscribe({
      next: (value) => console.debug(value),
      error: (error) => console.error(error),
      complete: () => {
        this.loadData();
      },
    });
  }

  onMouseEnter(row: any) {
    this.mouseOverRow = row;
    // Additional logic when mouse enters the row
  }

  onMouseLeave(row: any) {
    this.mouseOverRow = null;
    // Additional logic when mouse leaves the row
  }
}
