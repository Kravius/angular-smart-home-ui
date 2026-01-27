import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { DashboardListItem } from 'app/models/models';
import { MenuDashboardActionsGroup } from './dashboard.actions';

export interface DashboardMenuState {
  dashboardListItems: DashboardListItem[];
  error: HttpErrorResponse | null;
  activeDashboardListItemId?: string;
}

const initialDashboardMenuState: DashboardMenuState = {
  dashboardListItems: [],
  error: null,
};

export const menuDashboardReducer = createReducer(
  initialDashboardMenuState,
  on(MenuDashboardActionsGroup.getDashboardMenuItems, (state) => ({
    ...state,
    error: null,
  })),

  on(MenuDashboardActionsGroup.getDashboardMenuItemsSuccess, (state, { dashboardListItems }) => ({
    ...state,
    dashboardListItems,
    error: null,
  })),

  on(MenuDashboardActionsGroup.getDashboardMenuItemsFailure, (state, { error }) => ({
    ...state,
    error,
    activeDashboardListItemId: undefined,
  })),

  on(
    MenuDashboardActionsGroup.setActiveDashboardListItemId,
    (state, { activeDashboardListItemId }) => ({
      ...state,
      activeDashboardListItemId,
    }),
  ),

  on(MenuDashboardActionsGroup.postNewDashboardItem, (state) => ({ ...state, error: null })),

  on(MenuDashboardActionsGroup.deleteDashboardItem, (state) => ({ ...state, error: null })),
);
