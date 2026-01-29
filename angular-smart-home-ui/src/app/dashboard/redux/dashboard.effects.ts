import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { MenuDashboardActionsGroup } from './dashboard.actions';
import { ApiService } from 'app/common/service/api.service';
import { Router } from '@angular/router';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { selectDashboardMenuItems } from './dashboard.selectors';
@Injectable()
export class DashboardEffects {
  readonly #actions = inject(Actions);
  readonly #apiService = inject(ApiService);
  readonly #router = inject(Router);
  readonly #store: Store<AppState> = inject(Store);
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
      concatMap(({ newDashboard }) =>
        this.#apiService.postDashboardItem(newDashboard).pipe(
          tap(() => this.#router.navigate(['/dashboards', newDashboard.id])),

          concatMap(() =>
            of(
              MenuDashboardActionsGroup.setActiveDashboardListItemId({
                activeDashboardListItemId: newDashboard.id,
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

  readonly deleteDashboardItem$ = createEffect(() =>
    this.#actions.pipe(
      ofType(MenuDashboardActionsGroup.deleteDashboardItem),
      concatLatestFrom(() => [this.#store.select(selectDashboardMenuItems)]),
      switchMap(([{ id }, dashboards]) => {
        const nextId = dashboards.find((el) => el.id !== id);
        return this.#apiService.deleteDashboardItem(id).pipe(
          tap(() => {
            return this.#router.navigate([`/dashboards/${nextId?.id}`]);
          }),
          map(() => MenuDashboardActionsGroup.getDashboardMenuItems()),
          catchError((error) => of(MenuDashboardActionsGroup.getDashboardMenuItemsFailure(error))),
        );
      }),
    ),
  );
}
