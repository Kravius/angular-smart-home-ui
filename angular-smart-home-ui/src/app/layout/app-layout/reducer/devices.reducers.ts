import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Item } from 'app/models/models';
import { DevicesActionsGroup } from './devices.actions';

export interface AllDevicesState {
  allDevicesData: Item[];
  activeTabItemID: string | null;
  error: HttpErrorResponse | null;
}

const initialAllDevicesState: AllDevicesState = {
  allDevicesData: [],
  error: null,
  activeTabItemID: null,
};

export const allDevicesReducer = createReducer(
  initialAllDevicesState,
  on(DevicesActionsGroup.getAllDevices, (state) => ({
    ...state,
    error: null,
  })),

  on(DevicesActionsGroup.getAllDevicesSuccess, (state, { allDevicesData }) => ({
    ...state,
    allDevicesData,
    error: null,
  })),

  on(DevicesActionsGroup.getAllDevicesFailure, (state, { error }) => ({
    ...state,
    error,
    activeTabItemID: null,
  })),

  on(DevicesActionsGroup.toggleDeviceState, (state) => ({ ...state, error: null })),

  on(DevicesActionsGroup.toggleDeviceStateSuccess, (state, { updatedDevice }) => ({
    ...state,
    allDevicesData: state.allDevicesData.map((device) => {
      return device.id === updatedDevice.id ? updatedDevice : device;
    }),
  })),

  on(DevicesActionsGroup.toggleDeviceStateFailure, (state, { error }) => ({ ...state, error })),
);
