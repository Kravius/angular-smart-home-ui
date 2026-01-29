import {
  Component,
  inject,
  input,
  signal,
  ChangeDetectionStrategy,
  Injector,
  DestroyRef,
  WritableSignal,
} from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';

import { MenuDashboardActionsGroup } from 'app/dashboard/redux/dashboard.actions';
import {
  selectActiveDashboardTabID,
  selectDashboardTabs,
  selectIsEditMode,
} from './redux/tabs.selectors';
import { DashboardTabsGroup } from './redux/tabs.actions';
import { selectActiveDashboardListItemId } from 'app/dashboard/redux/dashboard.selectors';
import { DeleteDashboard } from 'app/sidebar/menu/action-menu/delete-dashboard/delete-dashboard';
import { EditSwitcher } from './edit-mode/edit-switcher/edit-switcher';
import { MatIcon } from '@angular/material/icon';
import { EditTabTitle } from './edit-mode/forms/edit-tab-title/edit-tab-title';
import { EditTitleService } from 'app/common/service/forms/edit-title.service';
import { EditAddTab } from './edit-mode/forms/edit-add-tab/edit-add-tab';

@Component({
  selector: 'app-tab-switcher',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatTabsModule,
    DeleteDashboard,
    EditSwitcher,
    EditTabTitle,
    EditAddTab,
  ],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  readonly #store: Store<AppState> = inject(Store);
  readonly #injector = inject(Injector);
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly editTitleService = inject(EditTitleService);

  protected activeLink = signal('');
  readonly dashboardId = input.required<string>();

  dashboardIdTabStore = this.#store.selectSignal(selectActiveDashboardListItemId);

  readonly dashboardListTab = this.#store.selectSignal(selectDashboardTabs);

  protected readonly tabId = this.#store.selectSignal(selectActiveDashboardTabID);

  readonly isEditMode = this.#store.selectSignal(selectIsEditMode);

  ngOnInit() {
    this.#store.dispatch(
      MenuDashboardActionsGroup.setActiveDashboardListItemId({
        activeDashboardListItemId: this.dashboardId(),
      }),
    );

    toObservable(this.dashboardId, { injector: this.#injector })
      .pipe(
        filter((id): id is string => !!id),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((dashboardId) => {
        this.#store.dispatch(
          MenuDashboardActionsGroup.setActiveDashboardListItemId({
            activeDashboardListItemId: dashboardId,
          }),
        );
        this.#store.dispatch(DashboardTabsGroup.getDashboardTabs({ dashboardId }));
      });

    toObservable(this.dashboardListTab, { injector: this.#injector })
      .pipe(
        filter((tabsData) => !!tabsData.tabs.length),
        filter(() => {
          const isCurrentUrl = this.#router.url === `/dashboards/${this.dashboardIdTabStore()}`;
          return isCurrentUrl;
        }),
        map((tabsData) => tabsData),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((tabsData) => {
        this.#router.navigate(['/dashboards', this.dashboardId(), tabsData.tabs[0].id], {
          replaceUrl: true,
        });
      });
  }

  setTabsIdStore(activeTabItemID: string) {
    this.#store.dispatch(DashboardTabsGroup.setActiveDashboardTabItemID({ activeTabItemID }));
    this.activeLink.set(activeTabItemID);
  }

  test() {
    console.log(this.tabId());
  }
}
