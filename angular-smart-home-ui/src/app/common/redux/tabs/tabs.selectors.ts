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


// import {
//   Component,
//   inject,
//   input,
//   signal,
//   effect,
//   ChangeDetectionStrategy,
//   computed,
// } from '@angular/core';
// import { DashboardTabsData } from '../models/models';
// import { MatTabsModule } from '@angular/material/tabs';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
// import { filter, map, switchMap } from 'rxjs';
// import { MatButtonModule } from '@angular/material/button';
// import { UpperCasePipe } from '@angular/common';
// import { Store } from '@ngrx/store';
// import { AppState } from 'app/reducers';
// import { DashboardTabsGroup } from 'app/common/redux/tabs/tabs.actions';
// import {
//   selectActiveDashboardListItemID,
//   selectDashboardMenuItemByID,
// } from 'app/common/redux/dashboard.selectors';
// import { selectDashboardTabs } from 'app/common/redux/tabs/tabs.selectors';

// @Component({
//   selector: 'app-tab-switcher',
//   imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, MatTabsModule, UpperCasePipe],
//   templateUrl: './tab-switcher.html',
//   styleUrl: './tab-switcher.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class TabSwitcher {
//   readonly #router = inject(Router);
//   readonly #store: Store<AppState> = inject(Store);
//   protected activeLink = signal('');
//   readonly dashboardId = input.required<string>();

//   private route = inject(ActivatedRoute); // TODO del

//   // readonly dashboardListTabbbbb = this.#store.selectSignal(selectDashboardTabs);

//   // dashboardIddddd = this.#store.selectSignal(selectActiveDashboardListItemID);

//   // ngOnInit() {
//   //   if (this.dashboardId()) {
//   //     console.log(this.dashboardIddddd(), 'dashboardId');
//   //     this.#store.dispatch(
//   //       DashboardTabsGroup.getDashboardTabs({ dashboardId: this.dashboardId() }),
//   //     );
//   //   }
//   // }

//   readonly dashboardListTab = toSignal(
//     this.route.data.pipe(map((data) => data['tabResolver'] as DashboardTabsData)),
//     { initialValue: { tabs: [] } }, // TODO del
//   );

//   readonly tabId = toSignal(
//     this.route.url.pipe(
//       map(() => this.route.firstChild),
//       filter((route): route is ActivatedRoute => !!route),
//       switchMap((route) => route.paramMap),
//       map((params) => params.get('tabId') ?? ''),
//     ),
//     { initialValue: '' },
//   ); // TODO del

//   // readonly dashboardTabsData = computed(() => {
//   //   const dashboardId = this.dashboardId();
//   //   if (!dashboardId) return { tabs: [] };
//   //   return this.#store.selectSignal(selectDashboardTabs)();
//   // });

//   // constructor() {
//   //   // console.log(this.dashboardIddddd(), 'dashboardId');
//   //   effect(() => {
//   //     const tabs = this.dashboardListTabbbbb().tabs;

//   //     this.activeLink.set(tabs[0].id);
//   //     if (!tabs || tabs.length === 0) return;
//   //     const currentUrl = this.#router.url;

//   //     if (currentUrl === `/dashboards/${this.dashboardId()}`) {
//   //       this.#router.navigate(['/dashboards', this.dashboardId(), tabs[0].id], {
//   //         replaceUrl: true,
//   //       });
//   //     }
//   //   });

//   constructor() {
//     // console.log(this.dashboardIddddd(), 'dashboardId');
//     effect(() => {
//       const tabs = this.dashboardListTab().tabs;

//       this.activeLink.set(tabs[0].id);
//       if (!tabs || tabs.length === 0) return;
//       const currentUrl = this.#router.url;

//       if (currentUrl === `/dashboards/${this.dashboardId()}`) {
//         this.#router.navigate(['/dashboards', this.dashboardId(), tabs[0].id], {
//           replaceUrl: true,
//         });
//       }
//     });

//     //we use it to make active tab
//     effect(() => {
//       const id = this.tabId();
//       this.activeLink.set(id);
//     });
//   }
//   test() {
//     // console.log(this.dashboardTabsData());
//     // console.log(this.dashboardListTabbbbb());
//   }
// }