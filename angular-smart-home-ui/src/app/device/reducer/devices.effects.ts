import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
// import { DashboardTabsGroup } from './cards.actions';
import { ApiService } from 'app/common/service/api.service';
import { DevicesActionsGroup } from './devices.actions';
import { DashboardTabsGroup } from 'app/common/redux/tabs/tabs.actions';

@Injectable()
export class DashboardDevicesEffects {
  readonly #actions = inject(Actions);
  readonly #apiService = inject(ApiService);

  readonly getAllDevicesItems$ = createEffect(() => {
    return this.#actions.pipe(
      ofType(DevicesActionsGroup.getAllDevices),
      switchMap(() =>
        this.#apiService.getAllDevices().pipe(
          map((response) => {
            return DevicesActionsGroup.getAllDevicesSuccess({
              allDevicesData: response,
            });
          }),
          catchError((error) => of(DevicesActionsGroup.getAllDevicesFailure({ error }))),
        ),
      ),
    );
  });

  readonly updateDevicesItem$ = createEffect(() =>
    this.#actions.pipe(
      ofType(DevicesActionsGroup.toggleDeviceState),
      switchMap(({ deviceId, newState, idCard }) =>
        this.#apiService.updateDevices(deviceId, newState).pipe(
          map((updatedDevice) => DevicesActionsGroup.toggleDeviceStateSuccess({ updatedDevice })),
          map(({ updatedDevice }) =>
            DashboardTabsGroup.updateDeviceByID({ updatedDevice, idCard }),
          ),
          catchError((error) => of(DevicesActionsGroup.toggleDeviceStateFailure({ error }))),
        ),
      ),
    ),
  );
}
