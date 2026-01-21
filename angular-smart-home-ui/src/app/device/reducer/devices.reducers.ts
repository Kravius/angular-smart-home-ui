import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Item, ItemType } from 'app/models/models';
import { DevicesActionsGroup } from './devices.actions';

export interface AllDevicesState {
  allDevicesData: Item[];
  activeTabItemID?: string;
  error?: HttpErrorResponse;
}

const initialAllDevicesState: AllDevicesState = {
  allDevicesData: [],
  error: undefined,
};

export const allDevicesReducer = createReducer(
  initialAllDevicesState,
  on(DevicesActionsGroup.getAllDevices, (state) => ({
    ...state,
    error: undefined,
  })),

  on(DevicesActionsGroup.getAllDevicesSuccess, (state, { allDevicesData }) => ({
    ...state,
    allDevicesData,
    error: undefined,
  })),

  on(DevicesActionsGroup.getAllDevicesFailure, (state, { error }) => ({
    ...state,
    error,
    activeTabItemID: undefined,
  })),

  on(DevicesActionsGroup.toggleDeviceState, (state) => ({ ...state, error: undefined })),

  on(DevicesActionsGroup.toggleDeviceStateSuccess, (state, { updatedDevice }) => ({
    ...state,
    allDevicesData: state.allDevicesData.map((device) => {
      return device.id === updatedDevice.id ? updatedDevice : device;
    }),
  })),

  on(DevicesActionsGroup.toggleDeviceStateFailure, (state, { error }) => ({ ...state, error })),
);
