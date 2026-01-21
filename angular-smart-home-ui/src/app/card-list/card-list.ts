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
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { DashboardTabsGroup } from 'app/common/redux/tabs/tabs.actions';
import {
  selectCardsFromCurrentTab,
  selectDashboardTabItemByID,
  selectDashboardTabs,
  selectDashboardTabsErrorMessage,
} from 'app/common/redux/tabs/tabs.selectors';
import { selectAllDevices } from 'app/device/reducer/devices.selectors';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardList {
  readonly tabId = input.required<string>();
  readonly dashboardId = input.required<string>();
  readonly #store: Store<AppState> = inject(Store);

  public readonly state = signal<DashboardTabsData>({ tabs: [] });

  readonly dashboardListTabOne = this.#store.selectSignal(selectCardsFromCurrentTab);
  readonly allDevicesData = this.#store.selectSignal(selectAllDevices);
  readonly dashboardListTabsAll = this.#store.selectSignal(selectDashboardTabs);
  readonly dashboardTabsErrorMessage = this.#store.selectSignal(selectDashboardTabsErrorMessage);

  constructor() {
    effect(() => {
      const state = this.dashboardListTabsAll();
      if (state) this.state.set(state);
    });
  }

  ngOnInit() {
    this.#store.dispatch(
      DashboardTabsGroup.setActiveDashboardTabItemID({ activeTabItemID: this.tabId() }),
    );
  }

  // readonly dashboardListTab = toSignal(
  //   inject(ActivatedRoute).parent!.data.pipe(map((data) => data['tabResolver'])),
  //   { initialValue: { tabs: [] } as DashboardTabsData | { tabs: [] } },
  // );
  test() {
    console.log(this.allDevicesData(), 'allDevicesData');
  }
  readonly activeTab = computed(() => {
    const data: DashboardTabsData = this.state();
    const tabId = this.tabId();
    if (!data || !tabId) return null;
    return data.tabs.find((tab) => tab.id === tabId) ?? null;
  });

  public updateCard(updatedCard: ICard, tabId: string) {
    this.state.update((state) => ({
      ...state,
      tabs: state.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              cards: tab.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
            }
          : tab,
      ),
    }));
  }
}
