import { Component, inject, input, output, signal } from '@angular/core';
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
  providers: [EditTitleService],
})
export class EditTabTitle {
  readonly editService = inject(EditTitleService);

  readonly isEditMode = input.required<boolean>();
  readonly tabId = input.required<string>();
  readonly title = input.required<string>();
  readonly link = input.required<(string | number)[]>();
  readonly active = input.required<boolean>();

  readonly select = output<string>();
  readonly save = output<{ tabId: string; title: string }>();

  protected isEditing = signal(false);

  startEdit() {
    if (!this.isEditMode()) return;
    this.isEditing.set(true);
    this.editService.startEditTabTitle(this.title());
  }

  submit() {
    this.save.emit({
      tabId: this.tabId(),
      title: this.editService.tabTitleControl.value!,
    });
    this.isEditing.set(false);
  }

  cancel() {
    this.editService.reset();
    this.isEditing.set(false);
  }
}
