import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import {
  AccessControlDevice,
  AccessControlDeviceType,
  AccessControlSystem,
} from '@utopiksandcastle/accesscontrol-api-client';
import {
  AbstractFormField,
  DynamicDialog,
  DialogOutput,
  Action as DialogAction,
  FormFieldArray,
  FormFieldInput,
  FormFieldSelect,
  FormFieldSelectOptionGroup,
} from '../../../../lib/angular-components/projects/dynamic-form/src/lib';

export enum Action {
  Create = 'Create',
  Update = 'Update',
}

@Component({
  selector: 'app-access-control-systems',
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
  ],
  templateUrl: './access-control-systems.component.html',
  styleUrl: './access-control-systems.component.scss',
})
export class AccessControlSystemsComponent {
  pageTitle = 'Access Control System';
  action = Action.Create;

  AccessControlDeviceType = AccessControlDeviceType;

  accessControlSystem: AccessControlSystem = {
    Name: '',
    AccessControlDeviceIds: [],
  };

  dataSource: MatTableDataSource<AccessControlSystem> =
    new MatTableDataSource();
  displayedColumns: string[] = ['name', 'accessControlDevices'];

  constructor(
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    private apiService: ApiService
  ) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    this.loadData();
  }

  loadData() {
    let accessControlDevices: AccessControlDevice[] = [];
    let data: AccessControlSystem[] = [];

    const accessControlDeviceObservable =
      this.apiService.accesControleDeviceService.apiV1AccessControlDeviceGet();
    const accessControlSystemObservable =
      this.apiService.accessControlSystemService.apiV1AccessControlSystemGet();

    forkJoin([
      accessControlDeviceObservable,
      accessControlSystemObservable,
    ]).subscribe({
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

  async openDialogCRUD(
    accessControlSystem: AccessControlSystem | undefined = undefined
  ) {
    if (accessControlSystem) {
      this.action = Action.Update;
    } else {
      this.action = Action.Create;
    }

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

      let formFieldAccessControlDeviceIds: AbstractFormField[] = [];
      accessControlSystem?.AccessControlDeviceIds?.forEach((id) => {
        formFieldAccessControlDeviceIds.push(
          new FormFieldSelect<string>({
            name: 'AccesControleDevice',
            title: 'Acces Controle Device',
            optionGroups: accessControlDeviceOptionGroups,
            value: id,
          })
        );
      });

      // Open the dialog with the updated option groups
      const dialogRef = this.dialog.open(DynamicDialog, {
        disableClose: true,
        width: '90%',
        data: {
          title: `Create a new ${this.pageTitle}`,
          buttonActionText: this.action,
          buttonDelete: this.action == Action.Update,
          dynFormFields: [
            new FormFieldInput<string>({
              name: 'Id',
              title: 'Id',
              hint: '',
              icon: '',
              placeholder: '',
              hidden: true,
              type: 'text',
              value: accessControlSystem?.Id || '',
            }),
            new FormFieldInput<string>({
              name: 'Name',
              title: 'Name',
              hint: '',
              icon: '',
              placeholder: '',
              required: this.isRequired(this.accessControlSystem.Name),
              type: 'text',
              value: accessControlSystem?.Name || '',
            }),
            new FormFieldArray({
              name: 'AccessControlDeviceIds',
              title: 'Access System Devices',
              subtitle: '',
              distinct: true,
              formFieldModel: new FormFieldSelect<string>({
                name: 'AccesControleDevice',
                title: 'Acces Controle Device',
                optionGroups: accessControlDeviceOptionGroups,
              }),
              formFields: formFieldAccessControlDeviceIds,
            }),
          ],
        },
      });

      dialogRef.beforeClosed().subscribe({
        next: (dialogOutput: DialogOutput<AccessControlSystem>) => {
          if (!dialogOutput) {
            return;
          }

          switch (dialogOutput.action) {
            case DialogAction.Close:
              break;

            case DialogAction.Submit:
              switch (this.action) {
                case Action.Create:
                  this.apiService.accessControlSystemService
                    .apiV1AccessControlSystemPost(dialogOutput.value)
                    .subscribe({
                      next: (value) => console.debug(value),
                      error: (err) => console.error(err),
                      complete: () => {
                        this.loadData();
                      },
                    });
                  break;
                case Action.Update:
                  this.apiService.accessControlSystemService
                    .apiV1AccessControlSystemIdPut(
                      dialogOutput.value.Id as string,
                      dialogOutput.value
                    )
                    .subscribe({
                      next: (value) => console.debug(value),
                      error: (err) => console.error(err),
                      complete: () => {
                        this.loadData();
                      },
                    });
                  break;
              }
              break;

            case DialogAction.Delete:
              this.apiService.accessControlSystemService
                .apiV1AccessControlSystemIdDelete(
                  dialogOutput.value.Id as string
                )
                .subscribe({
                  next: (value) => console.debug(value),
                  error: (err) => console.error(err),
                  complete: () => {
                    this.loadData();
                  },
                });
              break;

            default:
              break;
          }
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
