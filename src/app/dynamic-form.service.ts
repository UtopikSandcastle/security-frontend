import { Injectable } from "@angular/core";
import {
  AbstractFormField,
  DialogAction,
  DialogOutput,
  DynamicDialog,
  FormFieldArray,
  FormFieldInput,
  FormFieldSelect,
  FormfieldObject,
  Option,
  isPropertyRequired,
} from "@utopikgoodies/dynamic-form";
import {
  AccessControlSystem,
  AccessControlSystemComponentType,
} from "@utopiksandcastle/accesscontrol-api-client";
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
          const accessControlDeviceOptions: Option<string>[] = [];
          accessControlDevices.forEach((accessControlDevice) => {
            accessControlDeviceOptions.push({
              value: accessControlDevice.Id as string,
              viewValue: accessControlDevice.Name,
            });
          });

          const accessControlSystemComponentTypeOptions: Option<string>[] = Object.keys(
            AccessControlSystemComponentType
          ).map((key) => {
            return {
              value: key,
              viewValue:
                AccessControlSystemComponentType[
                  key as keyof typeof AccessControlSystemComponentType
                ],
            };
          });

          const componentsFormFields: AbstractFormField[] = [];
          if (accessControlSystem) {
            accessControlSystem.Components?.forEach((component) => {
              componentsFormFields.push(
                new FormfieldObject({
                  name: "Component",
                  title: "Component",
                  formFields: [
                    new FormFieldSelect<string>({
                      name: "AccessControlDeviceId",
                      title: "Acces Control Device",
                      options: accessControlDeviceOptions,
                      value: component.AccessControlDeviceId,
                    }),
                    new FormFieldSelect<string>({
                      name: "Type",
                      title: "Access Control System Component Type",
                      required: true,
                      options: accessControlSystemComponentTypeOptions,
                      value: component.Type,
                    }),
                  ],
                })
              );
            });
          } else {
            componentsFormFields.push(
              new FormfieldObject({
                name: "Component",
                title: "Component",
                formFields: [
                  new FormFieldSelect<string>({
                    name: "AccessControlDeviceId",
                    title: "Acces Control Device",
                    options: accessControlDeviceOptions,
                  }),
                  new FormFieldSelect<string>({
                    name: "Type",
                    title: "Access Control System Component Type",
                    required: true,
                    options: accessControlSystemComponentTypeOptions,
                  }),
                ],
              })
            );
          }

          observer.next([
            new FormFieldInput<string>({
              name: "Id",
              title: "Id",
              hidden: true,
              type: "text",
              value: accessControlSystem?.Id || "",
            }),
            new FormFieldInput<string>({
              name: "Name",
              title: "Name",
              required: isPropertyRequired(accessControlSystem?.Name),
              type: "text",
              value: accessControlSystem?.Name || "",
            }),
            new FormFieldArray({
              name: "Components",
              title: "Access Control System Components",
              distinct: true,
              formFields: componentsFormFields
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
        next: (formFields) => {
          const dialogRef = this.dialog.open(DynamicDialog, {
            disableClose: true,
            width: "90%",
            data: {
              title:
                action == Action.Update
                  ? "Update Access Control System"
                  : "Create a new Access Control System",
              buttonActionText: action,
              buttonDelete: action == Action.Update,
              dynFormFields: formFields,
            },
          });

          dialogRef.beforeClosed().subscribe({
            next: (dialogOutput: DialogOutput<AccessControlSystem>) => {
              console.debug(dialogOutput);
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
