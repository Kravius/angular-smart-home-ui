import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardMenuState } from './dashboard.reducers';

export const selectDashboardState = createFeatureSelector<DashboardMenuState>('dashboardMenu');

export const selectDashboardMenuItems = createSelector(
  selectDashboardState,
  (state) => state.dashboardListItems,
);

export const selectActiveDashboardListItemID = createSelector(
  selectDashboardState,
  (state) => state.activeDashboardListItemID,
);

export const selectDashboardMenuItemByID = createSelector(
  selectDashboardMenuItems,
  selectActiveDashboardListItemID,
  (items, id) => items.filter((item) => item.id === id),
);

export const selectDashboardErrorMessage = createSelector(selectDashboardMenuItems, (items) => {
  if (items.length) return '';

  return 'You don’t have any dashboards yet. They’ll appear here as soon as you create them';
});
