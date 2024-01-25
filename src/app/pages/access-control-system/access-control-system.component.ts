import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';

@Component({
  selector: 'app-page-access-control-system',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MenuButtonComponent,
  ],
  templateUrl: './access-control-system.component.html',
  styleUrl: './access-control-system.component.scss'
})
export class AccessControlSystemComponent {
  pageTitle = "Access Control System";
}
