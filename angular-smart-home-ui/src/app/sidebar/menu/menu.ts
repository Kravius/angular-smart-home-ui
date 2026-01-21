import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';

import { MenuDashboardActionsGroup } from 'app/dashboard/redux/dashboard.actions';
import {
  selectActiveDashboardListItemID,
  selectDashboardErrorMessage,
  selectDashboardMenuItems,
} from 'app/dashboard/redux/dashboard.selectors';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  readonly #router = inject(Router);
  readonly #store: Store<AppState> = inject(Store);

  protected readonly dashboardListItems = this.#store.selectSignal(selectDashboardMenuItems);
  protected readonly activeDashboardListItemID = this.#store.selectSignal(
    selectActiveDashboardListItemID,
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
        map((dashboardListItems) => {
          this.#router.navigate(
            ['/dashboards', this.activeDashboardListItemID() ?? dashboardListItems[0].id],
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
    return this.activeDashboardListItemID() === id;
  }

  protected setDashboardId(activeDashboardListItemID: string) {
    this.#store.dispatch(
      MenuDashboardActionsGroup.setActiveDashboardListItemID({ activeDashboardListItemID }),
    );
  }
}
