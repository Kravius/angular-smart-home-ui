import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Card } from '../card/card';
import { DashboardData, ICard, Tab } from '../models/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from 'app/common/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

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

  public readonly cardChange = output<ICard>();

  public readonly data = signal<DashboardData>({ tabs: [] });

  constructor() {
    console.log('test CardList');
    effect(() => {
      const res = this.dashboardListTab();
      if (res) this.data.set(res);
    });
  }

  handleCardChange(card: ICard) {
    this.cardChange.emit(card);
  }

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).parent!.data.pipe(map((data) => data['tabResolver'])),
    { initialValue: { tabs: [] } as DashboardData | { tabs: [] } }
  );

  test() {
    console.log(this.activeTab(), 'tabResolver CardList');
  }

  readonly activeTab = computed(() => {
    const data: DashboardData = this.dashboardListTab();
    const tabId = this.tabId();
    if (!data || !tabId) return null;
    return data.tabs.find((tab) => tab.id === tabId) ?? null;
  });

  public updateCard(updatedCard: ICard, tabId: string) {
    console.log(updatedCard.id, tabId);

    this.data.update((state) => ({
      ...state,
      tabs: state.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              cards: tab.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
            }
          : tab
      ),
    }));
  }
}
