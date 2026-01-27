import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';

import { MenuDashboardActionsGroup } from 'app/dashboard/redux/dashboard.actions';
import {
  selectActiveDashboardListItemId,
  selectDashboardErrorMessage,
  selectDashboardMenuItems,
} from 'app/dashboard/redux/dashboard.selectors';
import { CreateNewMenu } from './create-new-menu/create-new-menu';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink, CreateNewMenu],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly #router = inject(Router);
  readonly #store: Store<AppState> = inject(Store);

  protected readonly dashboardListItems = this.#store.selectSignal(selectDashboardMenuItems);
  protected readonly activeDashboardListItemId = this.#store.selectSignal(
    selectActiveDashboardListItemId,
  );
  protected readonly dashboardErrorMessage = this.#store.selectSignal(selectDashboardErrorMessage);

  constructor() {
    toObservable(this.dashboardListItems)
      .pipe(
        filter(() => {
          const currentUrl = this.#router.url;
          return currentUrl === '/' || currentUrl === '' || currentUrl === '/dashboards';
        }),
        filter((items) => !!items.length),
        tap((dashboardListItems) => {
          this.#router.navigate(
            ['/dashboards', this.activeDashboardListItemId() ?? dashboardListItems[0].id],
            {
              replaceUrl: true,
            },
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected isActiveLink(id: string) {
    return this.activeDashboardListItemId() === id;
  }

  protected setDashboardId(activeDashboardListItemId: string) {
    this.#store.dispatch(
      MenuDashboardActionsGroup.setActiveDashboardListItemId({ activeDashboardListItemId }),
    );
  }
}
