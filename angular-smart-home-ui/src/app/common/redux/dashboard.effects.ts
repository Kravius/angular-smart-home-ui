import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MenuDashboardActionsGroup } from './dashboard.actions';
import { ApiService } from '../service/api.service';

@Injectable()
export class DashboardEffects {
  readonly #actions = inject(Actions);
  readonly #apiService = inject(ApiService);

  readonly getDashboardMenuItems = createEffect(() => {
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
}
