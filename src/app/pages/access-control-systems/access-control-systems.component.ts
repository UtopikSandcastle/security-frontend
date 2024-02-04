import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AccessControlSystem } from '@utopiksandcastle/accesscontrol-api-client';

import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import {
  FormFieldInput,
  FormFieldArray,
  FormFieldSelectOptionGroup,
  FormFieldSelect,
  DynamicDialogComponent,
  DynamicFormComponent,
} from '../../../../lib/angular-dynamic-form/projects/dynamic-form/src/public-api';
import { __values } from 'tslib';
import { ApiService } from '../../api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-access-control-systems',
  standalone: true,
  imports: [
    DynamicDialogComponent,
    DynamicFormComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MenuButtonComponent,
  ],
  templateUrl: './access-control-systems.component.html',
  styleUrl: './access-control-systems.component.scss',
})
export class AccessControlSystemsComponent {
  pageTitle = 'Access Control System';

  accessControlSystem: AccessControlSystem = {
    Name: '',
    AccessControlDeviceIds: [],
  };

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  async openDialogCreate() {
    try {
      // Retrieve access control devices
      const accessControlDevices = await firstValueFrom(
        this.apiService.accesControleDeviceService.apiV1AccessControlDeviceGet()
      );

      if (!accessControlDevices) {
        // Handle the case where accessControlDevices is undefined
        console.error('Access control devices are undefined.');
        return;
      }

      // Convert access control devices to option groups
      const accessControlDeviceOptionGroups: FormFieldSelectOptionGroup[] = [];

      accessControlDevices.forEach((accessControlDevice) => {
        const groupIndex = accessControlDeviceOptionGroups.findIndex(
          (optionGroup) => optionGroup.name === accessControlDevice.Type
        );

        if (groupIndex > -1) {
          accessControlDeviceOptionGroups[groupIndex].options.push({
            value: accessControlDevice.Id as string,
            viewValue: accessControlDevice.Name,
          });
        } else {
          accessControlDeviceOptionGroups.push({
            name: accessControlDevice.Type as string,
            options: [
              {
                value: accessControlDevice.Id as string,
                viewValue: accessControlDevice.Name,
              },
            ],
          });
        }
      });

      // Open the dialog with the updated option groups
      const dialogRef = this.dialog.open(DynamicDialogComponent, {
        disableClose: true,
        width: '90%',
        data: {
          title: `Create a new ${this.pageTitle}`,
          button: 'Create',
          formFields: [
            new FormFieldInput<string>({
              name: 'Name',
              title: 'Name',
              hint: '',
              icon: '',
              placeholder: '',
              required: this.isRequired(this.accessControlSystem.Name),
              type: 'text',
              value: this.accessControlSystem.Name,
            }),
            new FormFieldArray({
              name: 'AccessControlDeviceIds',
              title: 'Access System Devices',
              subtitle: '',
              uniqueValue: true,
              formField: new FormFieldSelect<string>({
                name: 'AccesControleDevice',
                title: 'Acces Controle Device',
                optionGroups: accessControlDeviceOptionGroups,
              }),
            }),
          ],
        },
      });

      dialogRef.beforeClosed().subscribe({
        next: (value) => {
          console.debug(value);
          this.apiService.accessControlSystemService
            .apiV1AccessControlSystemPost(value)
            .subscribe({
              next: (value) => console.debug(value),
              error: (err) => console.error(err),
              complete: () => {},
            });
        },
        error: (err) => console.error(err),
      });
    } catch (error) {
      console.error(error);
    }
  }

  isRequired<T>(property: T | null): boolean {
    return property !== null;
  }
}
