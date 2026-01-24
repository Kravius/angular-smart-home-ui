import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DashboardTabsData, DeviceItem, ICard, SensorItem } from 'app/models/models';

export const dashboardTabs = 'Dashboard Tabs';

export const DashboardTabsGroup = createActionGroup({
  source: dashboardTabs,
  events: {
    'Get Dashboard Tabs': props<{ dashboardId: string }>(),
    'Get Dashboard Tabs Success': props<{ dashboardTabsData: DashboardTabsData }>(),
    'Get Dashboard Tabs Failure': props<{ error: HttpErrorResponse }>(),

    'Set Active Dashboard Tab Item ID': props<{ activeTabItemID: string }>(),

    'Update Device By ID': props<{ updatedDevice: DeviceItem; idCard: string }>(),
    'Enter Edit Mode': emptyProps(),
    'Exit Edit Mode': emptyProps(),

    'Add Tab': props<{ title: string }>(),
    'Remove Tab': props<{ tabId: string }>(),
    'Reorder Tab': props<{ tabId: string; direction: 'left' | 'right' }>(),

    'Add Card': props<{ tabId: string; layout: string }>(),
    'Remove Card': props<{ tabId: string; cardId: string }>(),
    'Reorder Card': props<{ tabId: string; cardId: string; newIndex: number }>(),
    'Add Item To Card': props<{ tabId: string; cardId: string; item: DeviceItem | SensorItem }>(),
    'Remove Item From Card': props<{ tabId: string; cardId: string; itemId: string }>(),

    'Save Dashboard': emptyProps(),
    'Save Dashboard Success': props<{ updatedDashboard: DashboardTabsData }>(),
    'Save Dashboard Failure': props<{ error: HttpErrorResponse }>(),

    'Discard Changes': emptyProps(),
    'Toggle Device State': props<{ deviceId: string; newState: boolean }>(),

    'Update Tab Title': props<{ tabId: string; title: string }>(),
    // TODO idKebab add
    'Update Dashboard Title': props<{ title: string }>(),
  },
});
