import { AccessControlSystem } from "@utopiksandcastle/accesscontrol-api-client";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../api.service";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MenuButtonComponent } from "../../components/menu-button/menu-button.component";
import { AccessControlSystemCardComponent } from "../../components/access-control-system-card/access-control-system-card.component";
import { DynamicFormService } from "../../dynamic-form.service";

@Component({
  selector: "app-page-dashboard",
  standalone: true,
  imports: [
    AccessControlSystemCardComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MenuButtonComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  providers: [],
})
export class DashboardComponent implements OnInit {
  pageTitle = "Dashboard";

  accessControlSystems: AccessControlSystem[] = [];

  constructor(
    private apiService: ApiService,
    private dynamicFormService: DynamicFormService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  openAccessControlSystemDialog(accessControlSystem: AccessControlSystem | undefined = undefined) {
    this.dynamicFormService.openAccessControlSystemDialog(accessControlSystem).subscribe({
      error: (error) => console.error(error),
    });
  }

  loadData() {
    this.apiService.accessControlSystemService.apiV1AccessControlSystemGet().subscribe({
      next: (value) => {
        this.accessControlSystems = value;
      },
      error: (error) => console.error(error),
      complete: () =>
        console.info(`${this.accessControlSystems.length} Access Control Systems loaded.`),
    });
  }
}
