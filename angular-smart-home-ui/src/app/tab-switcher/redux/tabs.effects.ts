import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { DashboardTabsGroup } from './tabs.actions';
import { ApiService } from 'app/common/service/api.service';

@Injectable()
export class DashboardTabsEffects {
  readonly #actions = inject(Actions);
  readonly #apiService = inject(ApiService);

  readonly getDashboardMenuItems = createEffect(() => {
    return this.#actions.pipe(
      ofType(DashboardTabsGroup.getDashboardTabs),
      switchMap(({ dashboardId }) =>
        this.#apiService.getDashboardTabsData((dashboardId)).pipe(
          map((response) => {
            return DashboardTabsGroup.getDashboardTabsSuccess({
              dashboardTabsData: response,
            });
          }),
          catchError((error) => of(DashboardTabsGroup.getDashboardTabsFailure({ error }))),
        ),
      ),
    );
  });
}
