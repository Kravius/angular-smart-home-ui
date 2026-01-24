import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { EditTitleService } from 'app/common/service/forms/edit-title.service';

@Component({
  selector: 'app-edit-tab-title',
  imports: [MatFormField, MatIcon, RouterLink, ReactiveFormsModule, MatInputModule, MatTabsModule],
  templateUrl: './edit-tab-title.html',
  styleUrl: './edit-tab-title.scss',
})
export class EditTabTitle {
  readonly editService = inject(EditTitleService);

  readonly isEditing = input.required<boolean>();
  readonly title = input.required<string>();
  readonly link = input.required<(string | number)[]>();
  readonly active = input.required<boolean>();

  readonly click = output<void>();
  readonly editClick = output<void>();
  readonly save = output<void>();
  readonly cancel = output<void>();
}
