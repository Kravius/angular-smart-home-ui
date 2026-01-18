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

  constructor() {}

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
