import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteForm } from '../delete-form/delete-form';

import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { MenuDashboardActionsGroup } from 'app/dashboard/redux/dashboard.actions';
import { selectActiveDashboardListItemId } from 'app/dashboard/redux/dashboard.selectors';
import { selectIsEditMode } from 'app/tab-switcher/redux/tabs.selectors';

@Component({
  selector: 'app-delete-dashboard',
  imports: [MatButtonModule, MatDialogModule, MatIcon],
  templateUrl: './delete-dashboard.html',
  styleUrl: './delete-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDashboard {
  readonly dialog = inject(MatDialog);
  readonly #store: Store<AppState> = inject(Store);
  dashboardIdTabStore = this.#store.selectSignal(selectActiveDashboardListItemId);
  readonly isEditMode = this.#store.selectSignal(selectIsEditMode);

  openDialog() {
    const dialogRef = this.dialog.open(DeleteForm);

    dialogRef.afterClosed().subscribe(() => {
      const dashboardId = this.dashboardIdTabStore();

      if (dashboardId) {
        this.#store.dispatch(MenuDashboardActionsGroup.deleteDashboardItem({ id: dashboardId }));
      }
    });
  }
}
