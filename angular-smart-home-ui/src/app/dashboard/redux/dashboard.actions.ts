import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DashboardListItem } from 'app/models/models';

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
