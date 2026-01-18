import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DashboardTabsData, DashboardListItem } from 'app/models/models';

export const menuDashboard = 'Menu Dashboard';

export const MenuDashboardActionsGroup = createActionGroup({
  source: menuDashboard,
  events: {
    'Get Dashboard Menu Items': emptyProps(),
    'Get Dashboard Menu Items Success': props<{ dashboardListItems: DashboardListItem[] }>(),
    'Get Dashboard Menu Items Failure': props<{ error: HttpErrorResponse }>(),
    'Set Active Dashboard List Item ID': props<{ activeDashboardListItemID: string }>(),
  },
});

// export const dashboardTabs = 'Dashboard Tabs';

// export const dashboardTabsGroup = createActionGroup({
//   source: dashboardTabs,
//   events: {
//     'Get Dashboard Tabs': props<{ dashboardId: string }>(),
//     'Get Dashboard Tabs Success': props<{ DashboardTabsData: DashboardTabsData }>(),
//     'Get Dashboard Tabs Failure': props<{ error: HttpErrorResponse }>(),
//   },
// });
