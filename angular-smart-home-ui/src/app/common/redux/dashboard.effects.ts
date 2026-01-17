import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthService } from 'app/common/service/auth.service';
import { catchError, EMPTY, exhaustMap, map, of, switchMap, tap } from 'rxjs';
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
        this.#apiService.getDashboardListItemQQQ().pipe(
          map((response) =>
            MenuDashboardActionsGroup.getDashboardMenuItemsSuccess({
              dashboardListItems: response,
            }),
          ),
          catchError((error) =>
            of(MenuDashboardActionsGroup.getDashboardMenuItemsFailure({ error })),
          ),
        ),
      ),
    );
  });
}
