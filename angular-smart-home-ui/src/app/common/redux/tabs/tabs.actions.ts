import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DashboardTabsData } from 'app/models/models';

export const dashboardTabs = 'Dashboard Tabs';

export const DashboardTabsGroup = createActionGroup({
  source: dashboardTabs,
  events: {
    'Get Dashboard Tabs': props<{ dashboardId: string }>(),
    'Get Dashboard Tabs Success': props<{ dashboardTabsData: DashboardTabsData }>(),
    'Get Dashboard Tabs Failure': props<{ error: HttpErrorResponse }>(),
    'Set Active Dashboard Tab Item ID': props<{ activeTabItemID: string }>(),
  },
});
