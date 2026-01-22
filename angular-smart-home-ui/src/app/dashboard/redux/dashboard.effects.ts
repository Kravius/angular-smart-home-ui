import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MenuDashboardActionsGroup } from './dashboard.actions';
import { ApiService } from 'app/common/service/api.service';
import { Router } from '@angular/router';

@Injectable()
export class DashboardEffects {
  readonly #actions = inject(Actions);
  readonly #apiService = inject(ApiService);
  readonly #router = inject(Router);
  readonly getDashboardMenuItems$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(MenuDashboardActionsGroup.getDashboardMenuItems),
      switchMap(() =>
        this.#apiService.getDashboardListItem().pipe(
          map((response) => {
            return MenuDashboardActionsGroup.getDashboardMenuItemsSuccess({
              dashboardListItems: response,
            });
          }),
          catchError((error) =>
            of(MenuDashboardActionsGroup.getDashboardMenuItemsFailure({ error })),
          ),
        ),
      ),
    );
  });

  readonly postDashboardNewItem$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(MenuDashboardActionsGroup.postNewDashboardItem),
      switchMap(({ newDashboard }) =>
        this.#apiService.postDashboardItem(newDashboard).pipe(
          tap(() => this.#router.navigate(['/dashboards', newDashboard.id])),

          switchMap(() =>
            of(
              MenuDashboardActionsGroup.setActiveDashboardListItemID({
                activeDashboardListItemID: newDashboard.id,
              }),
              MenuDashboardActionsGroup.getDashboardMenuItems(),
            ),
          ),

          catchError((error) =>
            of(MenuDashboardActionsGroup.getDashboardMenuItemsFailure({ error })),
          ),
        ),
      ),
    );
  });

  // readonly navigateToNewDashboard$ = createEffect(() =>
  //   this.#actions.pipe(ofType(MenuDashboardActionsGroup.setActiveDashboardListItemID)),
  // );
}
