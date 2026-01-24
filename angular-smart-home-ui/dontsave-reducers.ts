// export interface DashboardTabsState {
//   dashboardTabsData: DashboardTabsData;
//   activeTabItemID?: string;
//   isEditMode: boolean;
//   error?: HttpErrorResponse;
//   editSnapshot?: DashboardTabsData; // снимок для discardChanges
// }

// export const dashboardTabsReducer = createReducer(
//   initialDashboardTabsState,

//   on(DashboardTabsGroup.enterEditMode, (state) => ({
//     ...state,
//     isEditMode: true,
//     editSnapshot: JSON.parse(JSON.stringify(state.dashboardTabsData)), // создаем копию
//   })),

//   on(DashboardTabsGroup.exitEditMode, (state) => ({
//     ...state,
//     isEditMode: false,
//     editSnapshot: undefined,
//   })),

//   on(DashboardTabsGroup.discardChanges, (state) => ({
//     ...state,
//     dashboardTabsData: state.editSnapshot ?? state.dashboardTabsData,
//     isEditMode: false,
//     editSnapshot: undefined,
//   })),

//   on(DashboardTabsGroup.saveDashboardSuccess, (state, { updatedDashboard }) => ({
//     ...state,
//     dashboardTabsData: updatedDashboard,
//     isEditMode: false,
//     editSnapshot: undefined,
//   })),

//   // Добавление вкладки
//   on(DashboardTabsGroup.addTab, (state, { title }) => ({
//     ...state,
//     dashboardTabsData: {
//       ...state.dashboardTabsData,
//       tabs: [
//         ...state.dashboardTabsData.tabs,
//         { id: crypto.randomUUID(), title, cards: [] }, // новый таб
//       ],
//     },
//   })),

//   // Удаление вкладки
//   on(DashboardTabsGroup.removeTab, (state, { tabId }) => ({
//     ...state,
//     dashboardTabsData: {
//       ...state.dashboardTabsData,
//       tabs: state.dashboardTabsData.tabs.filter((tab) => tab.id !== tabId),
//     },
//   })),

//   // Переупорядочивание вкладок
//   on(DashboardTabsGroup.reorderTab, (state, { tabId, direction }) => {
//     const index = state.dashboardTabsData.tabs.findIndex((t) => t.id === tabId);
//     if (index < 0) return state;
//     const tabs = [...state.dashboardTabsData.tabs];
//     const swapIndex = direction === 'left' ? index - 1 : index + 1;
//     if (swapIndex < 0 || swapIndex >= tabs.length) return state;
//     [tabs[index], tabs[swapIndex]] = [tabs[swapIndex], tabs[index]];
//     return { ...state, dashboardTabsData: { ...state.dashboardTabsData, tabs } };
//   }),

//   // Добавление карточки
//   on(DashboardTabsGroup.addCard, (state, { tabId, layout }) => ({
//     ...state,
//     dashboardTabsData: {
//       ...state.dashboardTabsData,
//       tabs: state.dashboardTabsData.tabs.map((tab) =>
//         tab.id === tabId
//           ? { ...tab, cards: [...tab.cards, { id: crypto.randomUUID(), layout, items: [] }] }
//           : tab
//       ),
//     },
//   })),

//   // Удаление карточки
//   on(DashboardTabsGroup.removeCard, (state, { tabId, cardId }) => ({
//     ...state,
//     dashboardTabsData: {
//       ...state.dashboardTabsData,
//       tabs: state.dashboardTabsData.tabs.map((tab) =>
//         tab.id === tabId
//           ? { ...tab, cards: tab.cards.filter((c) => c.id !== cardId) }
//           : tab
//       ),
//     },
//   })),

//   // Добавление элемента в карточку
//   on(DashboardTabsGroup.addItemToCard, (state, { tabId, cardId, item }) => ({
//     ...state,
//     dashboardTabsData: {
//       ...state.dashboardTabsData,
//       tabs: state.dashboardTabsData.tabs.map((tab) =>
//         tab.id === tabId
//           ? {
//               ...tab,
//               cards: tab.cards.map((c) =>
//                 c.id === cardId ? { ...c, items: [...c.items, item] } : c
//               ),
//             }
//           : tab
//       ),
//     },
//   })),

//   // Удаление элемента из карточки
//   on(DashboardTabsGroup.removeItemFromCard, (state, { tabId, cardId, itemId }) => ({
//     ...state,
//     dashboardTabsData: {
//       ...state.dashboardTabsData,
//       tabs: state.dashboardTabsData.tabs.map((tab) =>
//         tab.id === tabId
//           ? {
//               ...tab,
//               cards: tab.cards.map((c) =>
//                 c.id === cardId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
//               ),
//             }
//           : tab
//       ),
//     },
//   }))
// );
