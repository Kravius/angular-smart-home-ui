import { Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { DashboardTabsGroup } from 'app/tab-switcher/redux/tabs.actions';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toKebabCase } from 'app/common/service/utilites';

@Component({
  selector: 'app-edit-add-tab',
  imports: [MatIcon, MatFormField, ReactiveFormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './edit-add-tab.html',
  styleUrl: './edit-add-tab.scss',
})
export class EditAddTab {
  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;

  readonly #store: Store<AppState> = inject(Store);
  tabTitleControl = new FormControl('');
  isEditing = signal(false);

  startEdit() {
    this.isEditing.set(true);
    Promise.resolve().then(() => this.inputRef?.nativeElement.focus());
  }

  cancel() {
    this.tabTitleControl.setValue('');
    this.isEditing.set(false);
  }

  addTab() {
    const title = this.tabTitleControl.value?.trim();
    if (!title) return;

    const id = `${toKebabCase(title)}-${Date.now()}`;
    this.#store.dispatch(DashboardTabsGroup.addTab({ id, title }));
    this.#store.dispatch(
      DashboardTabsGroup.setActiveDashboardTabItemID({ activeTabItemID: title }),
    );

    this.tabTitleControl.setValue('');
    this.isEditing.set(false);
  }
}
