import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AccessControlSystem } from '@utopiksandcastle/accesscontrol-api-client';

import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import {
  DynamicDialogComponent,
  DynamicFormComponent,
  FormFieldInput,
  FormFieldArray,
  FormFieldSelectOptionGroup,
  FormFieldSelect,
} from '../../../../lib/angular-dynamic-form/projects/dynamic-form/src/public-api';
import { __values } from 'tslib';
import { ApiService } from '../../api.service';

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

  openDialogCreate() {
    let accessControlDeviceOptionGroups: FormFieldSelectOptionGroup[] = [];

    this.apiService.accesControleDeviceService
      .apiV1AccessControlDeviceGet()
      .subscribe({
        next: (value) => {
          value.forEach((accessControlDevice) => {
            const groupIndex = accessControlDeviceOptionGroups.findIndex(
              (optionGroup) => optionGroup.name === accessControlDevice.Type
            );
            if (groupIndex > 0) {
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
        },
        error: (err) => console.error(err),
        complete: () => {
          this.dialog
            .open(DynamicDialogComponent<AccessControlSystem>, {
              width: '90%',
              data: {
                title: `Create a new ${this.pageTitle}`,
                button: 'Create',
                formFields: [
                  new FormFieldInput<string>({
                    name: 'name',
                    label: 'Name',
                    hint: '',
                    icon: '',
                    placeholder: '',
                    required: this.isRequired(this.accessControlSystem.Name),
                    type: 'text',
                    value: this.accessControlSystem.Name,
                  }),
                  new FormFieldArray({
                    name: 'accesssystemdevice',
                    label: 'Access System Device',
                    formField: new FormFieldSelect({
                      name: 'AccesControleDevice',
                      label: 'Acces Controle Device',
                      OptionGroup: accessControlDeviceOptionGroups,
                    }),
                  }),
                ],
              },
            })
            .componentInstance.formFieldValueChange.subscribe({
              next: (value: any) => console.debug(value),
              error: (err: any) => console.error(err),
              complete: () => console.log('Value change complete.'),
            });
          // .afterClosed()
          // .subscribe({
          //   next: (value) => console.debug(value),
          //   error: (err) => console.error(err),
          //   complete: () => {},
          // });}
        },
      });
  }

  isRequired<T>(property: T | null): boolean {
    return property !== null;
  }
}
