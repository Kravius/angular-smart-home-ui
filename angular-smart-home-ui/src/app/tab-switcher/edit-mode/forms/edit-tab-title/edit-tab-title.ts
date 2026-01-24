import { Component, inject, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { EditTitleService } from 'app/common/service/forms/edit-title.service';
import { toKebabCase } from 'app/common/service/utilites';
import { AppState } from 'app/reducers';
import { DashboardTabsGroup } from 'app/tab-switcher/redux/tabs.actions';
import { selectActiveDashboardTabID } from 'app/tab-switcher/redux/tabs.selectors';

@Component({
  selector: 'app-edit-tab-title',
  imports: [MatFormField, MatIcon, RouterLink, ReactiveFormsModule, MatInputModule, MatTabsModule],
  templateUrl: './edit-tab-title.html',
  styleUrl: './edit-tab-title.scss',
  providers: [EditTitleService],
})
export class EditTabTitle {
  readonly #store: Store<AppState> = inject(Store);

  readonly editService = inject(EditTitleService);

  readonly isEditMode = input.required<boolean>();
  readonly tabId = input.required<string>();
  readonly title = input.required<string>();
  readonly link = input.required<(string | number)[]>();
  readonly active = input.required<boolean>();

  readonly select = output<string>();

  protected isEditing = signal(false);

  protected readonly tabIdActiveStore = this.#store.selectSignal(selectActiveDashboardTabID);

  isActiveArrove() {
    return this.isEditMode() && !this.isEditing() && this.tabIdActiveStore() === this.tabId();
  }

  startEdit() {
    if (!this.isEditMode()) return;
    this.isEditing.set(true);
    this.editService.startEditTabTitle(this.title());
  }

  cancel() {
    this.editService.reset();
    this.isEditing.set(false);
  }

  onSaveTabTitle() {
    const id = toKebabCase(this.editService.tabTitleControl.value!);
    const event = {
      tabId: this.tabId(),
      title: this.editService.tabTitleControl.value!,
      id,
    };
    this.#store.dispatch(DashboardTabsGroup.updateTabTitle(event));
    this.#store.dispatch(DashboardTabsGroup.setActiveDashboardTabItemID({ activeTabItemID: id }));
    this.isEditing.set(false);
  }

  removeTab() {
    if (this.tabId() && typeof this.tabId() === 'string') {
      this.#store.dispatch(DashboardTabsGroup.removeTab({ tabId: this.tabId() as string }));
    }
    this.isEditing.set(false);
  }

  moveLeft() {
    this.#store.dispatch(
      DashboardTabsGroup.reorderTab({
        tabId: this.tabId(),
        direction: 'left',
      }),
    );
  }

  moveRight() {
    this.#store.dispatch(
      DashboardTabsGroup.reorderTab({
        tabId: this.tabId(),
        direction: 'right',
      }),
    );
  }
}
