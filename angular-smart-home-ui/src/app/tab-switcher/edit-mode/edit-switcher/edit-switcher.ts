import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { DashboardTabsGroup } from 'app/tab-switcher/redux/tabs.actions';
import { selectIsEditMode } from 'app/tab-switcher/redux/tabs.selectors';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-edit-switcher',
  imports: [MatIcon, MatButtonModule],
  templateUrl: './edit-switcher.html',
  styleUrl: './edit-switcher.scss',
})
export class EditSwitcher {
  readonly #store: Store<AppState> = inject(Store);

  readonly isEditMode = this.#store.selectSignal(selectIsEditMode);
  readonly dashboardId = this.#store.selectSignal(selectIsEditMode);

  protected enterEditMode() {
    this.#store.dispatch(DashboardTabsGroup.enterEditMode());
  }

  protected exitEditMode() {
    this.#store.dispatch(DashboardTabsGroup.exitEditMode());
  }

  protected saveDashboard() {
    this.#store.dispatch(DashboardTabsGroup.saveDashboard());
  }

  protected discardChanges() {
    this.#store.dispatch(DashboardTabsGroup.discardChanges());
  }
}
