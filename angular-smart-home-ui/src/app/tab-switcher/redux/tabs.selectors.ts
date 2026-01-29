import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardTabsState } from './tabs.reducers';
import { errorMessage } from '@consts/massages';

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

export const selectCardsFromCurrentTab = createSelector(selectDashboardTabItemByID, (items) => {
  return items[0];
});

export const selectDashboardTabsErrorMessage = createSelector(selectDashboardTabs, (items) => {
  if (items.tabs.length) return errorMessage.noTabsDevice;

  return errorMessage.noTabs;
});

export const selectIsEditMode = createSelector(
  selectDashboardTabsState,
  (state) => state.isEditMode,
);

export const selectEditSnapshot = createSelector(
  selectDashboardTabsState,
  (state) => state.editSnapshot,
);
