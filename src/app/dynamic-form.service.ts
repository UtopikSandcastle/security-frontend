import { Injectable } from "@angular/core";
import {
  AbstractFormField,
  DialogAction,
  DialogOutput,
  DynamicDialog,
  FormFieldArray,
  FormFieldInput,
  FormFieldSelect,
  FormFieldSelectOptionGroup,
  isPropertyRequired,
} from "@utopikgoodies/dynamic-form";
import { AccessControlSystem } from "@utopiksandcastle/accesscontrol-api-client";
import { Observable, Observer, firstValueFrom } from "rxjs";
import { ApiService } from "./api.service";
import { MatDialog } from "@angular/material/dialog";

enum Action {
  Create = "Create",
  Update = "Update",
}

@Injectable({
  providedIn: "root",
})
export class DynamicFormService {
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) {}

  generateAccessControlSystemForm(
    accessControlSystem: AccessControlSystem | undefined = undefined
  ): Observable<AbstractFormField[]> {
    return new Observable<AbstractFormField[]>((observer: Observer<AbstractFormField[]>) => {
      this.apiService.accesControleDeviceService.apiV1AccessControlDeviceGet().subscribe({
        next: (accessControlDevices) => {
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
                name: "AccesControleDevice",
                title: "Acces Controle Device",
                optionGroups: accessControlDeviceOptionGroups,
                value: id,
              })
            );
          });

          observer.next([
            new FormFieldInput<string>({
              name: "Id",
              title: "Id",
              hint: "",
              icon: "",
              placeholder: "",
              hidden: true,
              type: "text",
              value: accessControlSystem?.Id || "",
            }),
            new FormFieldInput<string>({
              name: "Name",
              title: "Name",
              hint: "",
              icon: "",
              placeholder: "",
              required: isPropertyRequired(accessControlSystem?.Name),
              type: "text",
              value: accessControlSystem?.Name || "",
            }),
            new FormFieldArray({
              name: "AccessControlDeviceIds",
              title: "Access System Devices",
              subtitle: "",
              distinct: true,
              formFieldModel: new FormFieldSelect<string>({
                name: "AccesControleDevice",
                title: "Acces Controle Device",
                optionGroups: accessControlDeviceOptionGroups,
              }),
              formFields: formFieldAccessControlDeviceIds,
            }),
          ]);

          observer.complete();
        },
        error: (error) => console.error(error),
      });

      return () => {};
    });
  }

  openAccessControlSystemDialog(
    accessControlSystem: AccessControlSystem | undefined = undefined
  ): Observable<AccessControlSystem> {
    return new Observable<AccessControlSystem>((observer: Observer<AccessControlSystem>) => {
      let action = accessControlSystem ? Action.Update : Action.Create;

      this.generateAccessControlSystemForm(accessControlSystem).subscribe({
        next: (value) => {
          const dialogRef = this.dialog.open(DynamicDialog, {
            disableClose: true,
            width: "90%",
            data: {
              title: "Create a new Access Control System",
              buttonActionText: action,
              buttonDelete: action == Action.Update,
              dynFormFields: value,
            },
          });

          dialogRef.beforeClosed().subscribe({
            next: (dialogOutput: DialogOutput<AccessControlSystem>) => {
              switch (dialogOutput.action) {
                case DialogAction.Close:
                  observer.complete();
                  break;

                case DialogAction.Submit:
                  switch (action) {
                    case Action.Create:
                      this.apiService.accessControlSystemService
                        .apiV1AccessControlSystemPost(dialogOutput.value)
                        .subscribe({
                          next: (value) => observer.next(value),
                          error: (error) => observer.error(error),
                          complete: () => {
                            observer.complete();
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
                          next: (value) => observer.next(value),
                          error: (error) => observer.error(error),
                          complete: () => {
                            observer.complete();
                          },
                        });
                      break;
                  }
                  break;

                case DialogAction.Delete:
                  this.apiService.accessControlSystemService
                    .apiV1AccessControlSystemIdDelete(dialogOutput.value.Id as string)
                    .subscribe({
                      next: (value) => observer.next(value),
                      error: (error) => observer.error(error),
                      complete: () => {
                        observer.complete();
                      },
                    });
                  break;
              }
            },
            error: (error) => console.error(error),
            complete: () => console.log("Dynamic Form Access Control System dialog closed"),
          });
        },
      });
    });
  }
}
