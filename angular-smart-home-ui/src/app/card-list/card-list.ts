import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Card } from '../card/card';
import { DashboardTabsData, ICard } from '../models/models';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';

import { selectAllDevices } from 'app/layout/app-layout/reducer/devices.selectors';
import {
  selectCardsFromCurrentTab,
  selectDashboardTabs,
  selectDashboardTabsErrorMessage,
} from 'app/tab-switcher/redux/tabs.selectors';
import { DashboardTabsGroup } from 'app/tab-switcher/redux/tabs.actions';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardList {
  readonly #store: Store<AppState> = inject(Store);

  readonly tabId = input.required<string>();
  readonly dashboardId = input.required<string>();

  readonly dashboardListTabOne = this.#store.selectSignal(selectCardsFromCurrentTab);
  readonly allDevicesData = this.#store.selectSignal(selectAllDevices);
  readonly dashboardListTabsAll = this.#store.selectSignal(selectDashboardTabs);
  readonly dashboardTabsErrorMessage = this.#store.selectSignal(selectDashboardTabsErrorMessage);

  constructor() {
    effect(() => {
      // const state = this.dashboardListTabsAll();
      // if (state) this.state.set(state);
    });
  }

  ngOnInit() {
    this.#store.dispatch(
      DashboardTabsGroup.setActiveDashboardTabItemID({ activeTabItemID: this.tabId() }),
    );
  }
}
