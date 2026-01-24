// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { DashboardTabsState } from './tabs.reducers';
// import { DashboardTabsData, ItemType } from 'app/models/models';

// // Состояние feature
// export const selectDashboardTabsState = createFeatureSelector<DashboardTabsState>('dashboardTabs');

// // --- Базовые селекторы ---
// export const selectDashboardTabs = createSelector(
//   selectDashboardTabsState,
//   (state) => state.dashboardTabsData
// );

// export const selectActiveDashboardTabID = createSelector(
//   selectDashboardTabsState,
//   (state) => state.activeTabItemID
// );

// export const selectDashboardTabsErrorMessage = createSelector(
//   selectDashboardTabsState,
//   (state) => {
//     const tabs = state.dashboardTabsData.tabs;
//     if (!tabs.length) return 'You don’t have any tabs yet. They’ll appear here as soon as you create them';
//     return 'You don’t have any tabs';
//   }
// );

// // --- Селекторы для карточек и элементов ---
// export const selectDashboardTabItemByID = createSelector(
//   selectDashboardTabs,
//   selectActiveDashboardTabID,
//   (tabsData, activeId) => tabsData.tabs.find((tab) => tab.id === activeId)
// );

// export const selectCardsFromCurrentTab = createSelector(
//   selectDashboardTabItemByID,
//   (tab) => tab?.cards ?? []
// );

// export const selectItemsFromCard = (cardId: string) =>
//   createSelector(selectCardsFromCurrentTab, (cards) => {
//     const card = cards.find((c) => c.id === cardId);
//     return card?.items ?? [];
//   });

// // --- Состояние редактирования ---
// export const selectIsEditMode = createSelector(
//   selectDashboardTabsState,
//   (state) => state.isEditMode
// );

// export const selectEditSnapshot = createSelector(
//   selectDashboardTabsState,
//   (state) => state.editSnapshot
// );

// // --- Селектор для получения всех вкладок с их индексом ---
// export const selectTabsWithIndex = createSelector(
//   selectDashboardTabs,
//   (tabsData) => tabsData.tabs.map((tab, index) => ({ ...tab, index }))
// );

// // --- Селектор для поиска элемента по ID ---
// export const selectItemById = (itemId: string) =>
//   createSelector(selectDashboardTabs, (tabsData) => {
//     for (const tab of tabsData.tabs) {
//       for (const card of tab.cards) {
//         const found = card.items.find((i) => i.id === itemId);
//         if (found) return found;
//       }
//     }
//     return null;
//   });

// // --- Селектор для проверки, есть ли вкладки ---
// export const selectHasTabs = createSelector(
//   selectDashboardTabs,
//   (tabsData) => tabsData.tabs.length > 0
// );
