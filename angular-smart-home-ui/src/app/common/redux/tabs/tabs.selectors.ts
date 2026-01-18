import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dashboardTabsReducer, DashboardTabsState } from './tabs.reducers';
import { DashboardTabsData } from 'app/models/models';

export const selectDashboardTabsState = createFeatureSelector<DashboardTabsState>('dashboardTabs');

export const selectDashboardTabs = createSelector(
  selectDashboardTabsState,
  (state) => state.dashboardTabsData,
);

export const selectActiveDashboardTabID = createSelector(
  selectDashboardTabsState,
  (state) => state.activeTabItemID,
);

export const selectDashboardTabItemByID = createSelector(
  selectDashboardTabs,
  selectActiveDashboardTabID,
  (items, id) => items.tabs.filter((item) => item.id === id),
);

export const selectDashboardTabsErrorMessage = createSelector(selectDashboardTabs, (items) => {
  if (items.tabs.length) return '';

  return 'You don’t have any tabs yet. They’ll appear here as soon as you create them';
});


