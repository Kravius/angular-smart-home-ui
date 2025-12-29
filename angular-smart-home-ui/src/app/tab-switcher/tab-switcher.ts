import { Component, inject, input, signal, effect } from '@angular/core';
import { DashboardData, ICard } from '../models/models';
import { ApiService } from '../common/service/api.service';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabGroup, MatTab, CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  readonly #appService = inject(ApiService);

  protected data = signal<DashboardData>({ tabs: [] });
  readonly dashboardId = input.required<string>();

  constructor() {
    effect(() => {
      const dashboardId = this.dashboardId();
      console.log(dashboardId, 'effect');
      this.#appService.getDashboardData(dashboardId).subscribe({
        next: (res) => {
          this.data.set(res);
        },
        error: (err) => {
          console.error('нету табов:', err);
        },
      });
    });
  }

  test() {
    console.log(this.data());
  }

  public updateCard(updatedCard: ICard, tabId: string) {
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
