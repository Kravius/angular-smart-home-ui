import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AllDevicesState } from './devices.reducers';

export const selectDashboardState = createFeatureSelector<AllDevicesState>('allDevices');

export const selectAllDevices = createSelector(
  selectDashboardState,
  (state) => state.allDevicesData,
);

// export const selectDevicesErrorMessage = createSelector(selectAllDevices, (items) => {
//   if (items) return 'You don’t have any tabs';

//   return 'You don’t have any tabs yet. They’ll appear here as soon as you create them';
// });
