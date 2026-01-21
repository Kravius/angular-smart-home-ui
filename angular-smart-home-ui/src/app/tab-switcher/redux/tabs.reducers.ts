import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { DashboardTabsData, DeviceItem, ItemType } from 'app/models/models';
import { DashboardTabsGroup } from './tabs.actions';

export interface DashboardTabsState {
  dashboardTabsData: DashboardTabsData;
  activeTabItemID?: string;
  error?: HttpErrorResponse;
}

const initialDashboardTabsState: DashboardTabsState = {
  dashboardTabsData: { tabs: [] },
  error: undefined,
};

export const dashboardTabsReducer = createReducer(
  initialDashboardTabsState,
  on(DashboardTabsGroup.getDashboardTabs, (state, { dashboardId }) => ({
    ...state,
    error: undefined,
  })),

  on(DashboardTabsGroup.getDashboardTabsSuccess, (state, { dashboardTabsData }) => ({
    ...state,
    dashboardTabsData,
    error: undefined,
  })),

  on(DashboardTabsGroup.getDashboardTabsFailure, (state, { error }) => ({
    ...state,
    error,
    activeTabItemID: undefined,
  })),

  on(DashboardTabsGroup.setActiveDashboardTabItemID, (state, { activeTabItemID }) => ({
    ...state,
    activeTabItemID,
  })),

  on(DashboardTabsGroup.updateDeviceByID, (state, { updatedDevice, idCard }) => ({
    ...state,
    dashboardTabsData: {
      ...state.dashboardTabsData,
      tabs: state.dashboardTabsData.tabs.map((tab) => ({
        ...tab,
        cards: tab.cards.map((card) =>
          card.id !== idCard
            ? card
            : {
                ...card,
                items: card.items.map((item) =>
                  item.type === ItemType.DEVICE && item.id === updatedDevice.id
                    ? updatedDevice
                    : item,
                ),
              },
        ),
      })),
    },
  })),
);
