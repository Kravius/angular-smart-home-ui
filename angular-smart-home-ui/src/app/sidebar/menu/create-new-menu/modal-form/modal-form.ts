import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalDashboardForm } from 'app/common/service/forms/modal-form.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-modal-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalForm {
  protected readonly modalDashboardForm = inject(ModalDashboardForm);
}
