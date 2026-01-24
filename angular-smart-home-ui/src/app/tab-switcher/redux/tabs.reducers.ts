import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { DashboardTabsData, DeviceItem, ItemType } from 'app/models/models';
import { DashboardTabsGroup } from './tabs.actions';

export interface DashboardTabsState {
  dashboardTabsData: DashboardTabsData;
  activeTabItemID?: string;
  error?: HttpErrorResponse;
  editSnapshot?: DashboardTabsData;
  isEditMode: boolean;
}

const initialDashboardTabsState: DashboardTabsState = {
  dashboardTabsData: { tabs: [] },
  error: undefined,
  editSnapshot: undefined,
  isEditMode: false,
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

  on(DashboardTabsGroup.enterEditMode, (state) => ({
    ...state,
    isEditMode: true,
    editSnapshot: structuredClone(state.dashboardTabsData),
  })),

  on(DashboardTabsGroup.discardChanges, (state) => ({
    ...state,
    dashboardTabsData: state.editSnapshot ?? state.dashboardTabsData,
    editSnapshot: undefined,
    isEditMode: false,
  })),

  on(DashboardTabsGroup.saveDashboardSuccess, (state, { updatedDashboard }) => ({
    ...state,
    dashboardTabsData: updatedDashboard,
    editSnapshot: undefined,
    isEditMode: false,
  })),

  on(DashboardTabsGroup.saveDashboardFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // TODO id:idKebab add
  on(DashboardTabsGroup.updateTabTitle, (state, { tabId, title }) => ({
    ...state,
    dashboardTabsData: {
      ...state.dashboardTabsData,
      tabs: state.dashboardTabsData.tabs.map((tab) => (tab.id === tabId ? { ...tab, title } : tab)),
    },
  })),

  on(DashboardTabsGroup.removeTab, (state, { tabId }) => ({
    ...state,
    dashboardTabsData: {
      ...state.dashboardTabsData,
      tabs: state.dashboardTabsData.tabs.filter((tab) => tab.id !== tabId),
    },
  })),

  on(DashboardTabsGroup.reorderTab, (state, { tabId, direction }) => {
    const tabs = [...state.dashboardTabsData.tabs];
    const index = tabs.findIndex((t) => t.id === tabId);

    if (index === -1) return state;

    const targetIndex = direction === 'left' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= tabs.length) {
      return state;
    }

    [tabs[index], tabs[targetIndex]] = [tabs[targetIndex], tabs[index]];

    return {
      ...state,
      dashboardTabsData: {
        ...state.dashboardTabsData,
        tabs,
      },
    };
  }),

  on(DashboardTabsGroup.addTab, (state, { title }) => ({
    ...state,
    dashboardTabsData: {
      ...state.dashboardTabsData,
      tabs: [...state.dashboardTabsData.tabs, { id: title, title, cards: [] }],
    },
  })),

  // on(DashboardTabsGroup.updateDashboardTitle, (state, { title }) => ({
  //   ...state,
  //   dashboardTabsData: {
  //     ...state.dashboardTabsData,
  //     title,
  //   },
  // })),
);
