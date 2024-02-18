import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-menu-button",
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: "./menu-button.component.html",
  styleUrl: "./menu-button.component.scss",
})
export class MenuButtonComponent {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass("material-symbols-outlined");
  }
}
