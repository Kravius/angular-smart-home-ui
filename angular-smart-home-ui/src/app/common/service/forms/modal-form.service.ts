import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ModalDashboardForm {
  modalDashboardFormGroup = new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(30)],
    }),

    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),

    icon: new FormControl('home', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)],
    }),
  });

  reset() {
    this.modalDashboardFormGroup.reset({ id: '', title: '', icon: '' });
  }
}
