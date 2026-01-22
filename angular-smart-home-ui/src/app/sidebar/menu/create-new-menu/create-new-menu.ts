import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalNewDashboard } from './modal/modal';
import { DashboardListItem } from 'app/models/models';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { MenuDashboardActionsGroup } from 'app/dashboard/redux/dashboard.actions';

@Component({
  selector: 'app-create-new-menu',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  styleUrls: ['./create-new-menu.scss'],
  templateUrl: './create-new-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewMenu {
  readonly #store: Store<AppState> = inject(Store);
  private readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNewDashboard, {
      data: {
        //TODO will see may be we need or not
      },
    });

    dialogRef.afterClosed().subscribe((newDashboard: DashboardListItem) => {
      if (newDashboard !== undefined) {
        this.#store.dispatch(MenuDashboardActionsGroup.postNewDashboardItem({ newDashboard }));
      }
    });
  }

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
  }
}
