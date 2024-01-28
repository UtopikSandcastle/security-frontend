import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import {
  DynamicFormComponent,
  FormFieldBase,
  FormFieldInput,
} from '../../../../lib/angular-dynamic-form/projects/dynamic-form/src/public-api';

@Component({
  selector: 'app-crud-dialog',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, MatButton],
  templateUrl: './crud-dialog.component.html',
  styleUrl: './crud-dialog.component.scss',
})
export class CrudDialogComponent<T> {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CrudDialogData,
    public dialogRef: MatDialogRef<CrudDialogComponent<T>>
  ) {
  }

  onCreate(value: T) {
    console.debug(value);
  }
  onUpdate(value: T) {
    console.debug(value);
  }
  onDelete(value: T) {
    console.debug(value);
  }

  onNoClick() {
    this.dialogRef.close();
  }

}

export class CrudDialogData {
  title!: string;
  button!: string;
  values!: { [s: string]: unknown };
  formFields!: (FormFieldBase<unknown> | FormFieldInput<unknown>)[];
}
