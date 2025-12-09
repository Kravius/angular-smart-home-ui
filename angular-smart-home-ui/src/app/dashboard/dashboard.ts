import { Component, inject, signal } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { ApiService } from '../common/service/api.service';
import { DashboardData, ICard, Tab } from '../models/models';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
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
    console.log(this.data());
  }
}
