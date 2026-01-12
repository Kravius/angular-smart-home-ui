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
import { DashboardData, ICard } from '../models/models';
import { toSignal } from '@angular/core/rxjs-interop';
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

  public readonly state = signal<DashboardData>({ tabs: [] });

  constructor() {
    effect(() => {
      const state = this.dashboardListTab();
      if (state) this.state.set(state);
    });
  }

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).parent!.data.pipe(map((data) => data['tabResolver'])),
    { initialValue: { tabs: [] } as DashboardData | { tabs: [] } }
  );

  readonly activeTab = computed(() => {
    const data: DashboardData = this.state();
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
          : tab
      ),
    }));
  }
}
