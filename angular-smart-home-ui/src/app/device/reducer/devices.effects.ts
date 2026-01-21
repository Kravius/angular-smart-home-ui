import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
// import { DashboardTabsGroup } from './cards.actions';
import { ApiService } from 'app/common/service/api.service';
import { DevicesActionsGroup } from './devices.actions';

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

  // readonly updateDevicesItem$ = createEffect(() => {
  //   return (
  //     this.#actions.pipe(ofType(DevicesActionsGroup.toggleDeviceState)),
  //     switchMap(() => this.#apiService.updateDevices().pipe())
  //   );
  // });
}
