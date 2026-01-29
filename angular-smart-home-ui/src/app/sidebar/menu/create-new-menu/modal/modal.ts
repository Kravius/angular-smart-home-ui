import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

import { ModalDashboardForm } from 'app/common/service/forms/modal-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
// import { DialogModule } from '@angular/cdk/dialog';

export interface DialogData {
  name: string;
  animal: string;
}

@Component({
  selector: 'app-modal-new-dashboard',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    // DialogModule,
  ],
  styleUrls: ['./modal.scss'],
  templateUrl: './modal.html',
})
export class ModalNewDashboard {
  readonly #store: Store<AppState> = inject(Store);

  protected readonly modalDashboardForm = inject(ModalDashboardForm);
  private readonly dialogRef = inject(MatDialogRef<ModalNewDashboard>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
    this.modalDashboardForm.reset();
  }

  submit(): void {
    //  this.modalDashboardForm.modalDashboardFormGroup.value;
    this.dialogRef.close(this.modalDashboardForm.modalDashboardFormGroup.value);

    // this.modalDashboardForm.reset();
  }
}
