import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DashboardTabsData, DeviceItem, ICard, Item } from 'app/models/models';

export const dashboardDevices = 'Dashboard Devices';

export const DevicesActionsGroup = createActionGroup({
  source: dashboardDevices,
  events: {
    'Get All Devices': emptyProps(),
    'Get All Devices Success': props<{ allDevicesData: Item[] }>(),
    'Get All Devices Failure': props<{ error: HttpErrorResponse }>(),

    'Toggle Device State': props<{ deviceId: string; newState: boolean; idCard: string }>(),
    'Toggle Device State Success': props<{ updatedDevice: DeviceItem }>(),
    'Toggle Device State Failure': props<{ error: HttpErrorResponse }>(),

    
  },
});
