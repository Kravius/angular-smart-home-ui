import { Component, inject, signal } from '@angular/core';
import { DashboardData, ICard } from '../models/models';
import { ApiService } from '../common/service/api.service';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabGroup, MatTab, CardList],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  readonly #appService = inject(ApiService);
  protected data = signal<DashboardData>({ tabs: [] });

  public ngOnInit() {
    const dataApi = this.#appService.getDashboardData();

    dataApi.subscribe((data) => {
      this.data.set(data);
    });
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
