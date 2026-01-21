import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { DashboardListItem, DashboardTabsData } from 'app/models/models';
import { MenuDashboardActionsGroup } from './dashboard.actions';

export interface DashboardMenuState {
  dashboardListItems: DashboardListItem[];
  error?: HttpErrorResponse;
  activeDashboardListItemID?: string;
}

const initialDashboardMenuState: DashboardMenuState = {
  dashboardListItems: [],
  error: undefined,
};

export const menuDashboardReducer = createReducer(
  initialDashboardMenuState,
  on(MenuDashboardActionsGroup.getDashboardMenuItems, (state) => ({
    ...state,
    error: undefined,
  })),

  on(MenuDashboardActionsGroup.getDashboardMenuItemsSuccess, (state, { dashboardListItems }) => ({
    ...state,
    dashboardListItems,
    error: undefined,
  })),

  on(MenuDashboardActionsGroup.getDashboardMenuItemsFailure, (state, { error }) => ({
    ...state,
    error,
    activeDashboardListItemID: undefined,
  })),

  on(
    MenuDashboardActionsGroup.setActiveDashboardListItemID,
    (state, { activeDashboardListItemID }) => ({
      ...state,
      activeDashboardListItemID,
    }),
  ),
);
