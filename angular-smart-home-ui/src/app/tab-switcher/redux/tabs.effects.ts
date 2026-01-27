import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { DashboardTabsGroup } from './tabs.actions';
import { ApiService } from 'app/common/service/api.service';
import { AppState } from 'app/reducers';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { selectActiveDashboardListItemId } from 'app/dashboard/redux/dashboard.selectors';
import { selectDashboardTabs } from './tabs.selectors';

@Injectable()
export class DashboardTabsEffects {
  readonly #actions = inject(Actions);
  readonly #apiService = inject(ApiService);
  readonly #store = inject(Store<AppState>);

  readonly getDashboardMenuItems = createEffect(() => {
    return this.#actions.pipe(
      ofType(DashboardTabsGroup.getDashboardTabs),
      switchMap(({ dashboardId }) =>
        this.#apiService.getDashboardTabsData(dashboardId).pipe(
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

  readonly saveDashboard = createEffect(() => {
    return this.#actions.pipe(
      ofType(DashboardTabsGroup.saveDashboard),
      concatLatestFrom(() => [
        this.#store.select(selectActiveDashboardListItemId),
        this.#store.select(selectDashboardTabs),
      ]),
      filter(
        ([_, dashboardId, dashboardTabsData]) =>
          typeof dashboardId === 'string' && dashboardId.length > 0,
      ),
      switchMap(([_, dashboardId, dashboardTabsData]) =>
        this.#apiService.putDashboardTabsItem(dashboardId as string, dashboardTabsData).pipe(
          map((updatedDashboard) => {
            return DashboardTabsGroup.saveDashboardSuccess({ updatedDashboard });
          }),
          catchError((error) => of(DashboardTabsGroup.saveDashboardFailure({ error }))),
        ),
      ),
    );
  });
}
