import {
  Component,
  inject,
  input,
  signal,
  effect,
  ChangeDetectionStrategy,
  computed,
  Injector,
  DestroyRef,
} from '@angular/core';
import { DashboardTabsData } from '../models/models';
import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { UpperCasePipe } from '@angular/common';
import {
  selectActiveDashboardTabID,
  selectDashboardTabs,
} from 'app/common/redux/tabs/tabs.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { selectActiveDashboardListItemID } from 'app/common/redux/dashboard.selectors';
import { DashboardTabsGroup } from 'app/common/redux/tabs/tabs.actions';
import { MenuDashboardActionsGroup } from 'app/common/redux/dashboard.actions';

@Component({
  selector: 'app-tab-switcher',
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, MatTabsModule, UpperCasePipe],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  readonly #store: Store<AppState> = inject(Store);
  readonly #injector = inject(Injector);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected activeLink = signal('');

  // readonly dashboardTabsData = computed(() => {
  //   const dashboardId = this.dashboardId();
  //   console.log(dashboardId, 'computed');
  //   if (!dashboardId) return { tabs: [] };
  //   return this.#store.selectSignal(selectDashboardTabs)();
  // });

  // readonly dashboardListTab = toSignal(
  //   this.route.data.pipe(map((data) => data['tabResolver'] as DashboardTabsData)),
  //   { initialValue: { tabs: [] } },
  // );

  // readonly tabId = toSignal(
  //   this.route.url.pipe(
  //     map(() => this.route.firstChild),
  //     filter((route): route is ActivatedRoute => !!route),
  //     switchMap((route) => route.paramMap),
  //     map((params) => params.get('tabId') ?? ''),
  //   ),
  //   { initialValue: '' },
  // );

  // constructor() {
  //   effect(() => {
  //     const tabs = this.dashboardListTab().tabs;

  //     this.activeLink.set(tabs[0].id);
  //     if (!tabs || tabs.length === 0) return;
  //     const currentUrl = this.router.url;

  //     if (currentUrl === `/dashboards/${this.dashboardITabStore()}`) {
  //       this.router.navigate(['/dashboards', this.dashboardId(), tabs[0].id], {
  //         replaceUrl: true,
  //       });
  //     }
  //   });
  constructor() {
    // effect(() => {
    //   const tabs = this.dashboardListTab().tabs;
    //   //  const id = this.dashboardITabStore();
    //   this.activeLink.set(tabs[0].id);
    //   if (!tabs || tabs.length === 0) return;
    //   const currentUrl = this.router.url;
    //   console.log(this.dashboardITabStore(), 'store effect');
    //   console.log(this.dashboardId(), 'copm effect');
    //   if (currentUrl === `/dashboards/${this.dashboardId()}`) {
    //     this.router.navigate(['/dashboards', this.dashboardId(), tabs[0].id], {
    //       replaceUrl: true,
    //     });
    //   }
    // });
    //we use it to make active tab
    // effect(() => {
    //   const id = this.tabId();
    //   this.activeLink.set(id);
    // });
  }

  readonly dashboardId = input.required<string>();

  dashboardITabStore = this.#store.selectSignal(selectActiveDashboardListItemID);

  readonly dashboardListTab = this.#store.selectSignal(selectDashboardTabs);
  readonly activeDashboardTabID = this.#store.selectSignal(selectActiveDashboardTabID);
  readonly #destroyRef = inject(DestroyRef);
  protected readonly tabId = this.#store.selectSignal(selectActiveDashboardTabID);

  ngOnInit() {
    console.log(this.tabId(), 'tabId before');
    this.#store.dispatch(
      MenuDashboardActionsGroup.setActiveDashboardListItemID({
        activeDashboardListItemID: this.dashboardId(),
      }),
    );

    toObservable(this.dashboardId, { injector: this.#injector })
      .pipe(
        filter((id): id is string => !!id),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((dashboardId) => {
        this.#store.dispatch(DashboardTabsGroup.getDashboardTabs({ dashboardId }));
      });

    toObservable(this.dashboardListTab, { injector: this.#injector })
      .pipe(
        filter((tabsData) => !!tabsData.tabs.length),
        filter(() => {
          const isCurrentUrl = this.router.url === `/dashboards/${this.dashboardITabStore()}`;
          return isCurrentUrl;
        }),
        map((tabsData) => tabsData),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((tabsData) => {
        this.router.navigate(['/dashboards', this.dashboardId(), tabsData.tabs[0].id], {
          replaceUrl: true,
        });
      });
  }

  setTabsIdStore(activeTabItemID: string) {
    this.#store.dispatch(DashboardTabsGroup.setActiveDashboardTabItemID({ activeTabItemID }));
    this.activeLink.set(activeTabItemID);
  }
}
