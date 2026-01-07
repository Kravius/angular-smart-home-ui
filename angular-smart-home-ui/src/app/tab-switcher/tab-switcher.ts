import { Component, inject, input, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { DashboardData, DashboardListItem, ICard } from '../models/models';
import { ApiService } from '../common/service/api.service';
import { MatTabGroup, MatTab, MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tab-switcher',
  imports: [
    MatTabGroup,
    MatTab,
    CardList,
    RouterOutlet,
    RouterLinkWithHref,
    MatButtonModule,
    MatTabsModule,
  ],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  readonly #appService = inject(ApiService);

  protected data = signal<DashboardData>({ tabs: [] });
  readonly dashboardId = input.required<string>();

  private router = inject(Router);

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['tabResolver'])),
    { initialValue: null as DashboardData | null }
  );

  test() {
    console.log(this.dashboardListTab(), 'tabResolver');
  }

  constructor() {
    effect(() => {
      const dashboardId = this.dashboardId();

      this.#appService.getDashboardData(dashboardId).subscribe({
        next: (res) => {
          this.data.set(res);
        },
        error: (err) => {
          console.error('нету табов:', err);
        },
      });
    });
    effect(() => {
      const tabs = this.dashboardListTab().tabs;

      if (!tabs || tabs.length === 0) return;
      const currentUrl = this.router.url;
      console.log(currentUrl, 'DashboardData Tabs');
      if (currentUrl === '/' || currentUrl === '' || currentUrl === '/dashboards') {
        this.router.navigate(['/dashboards', this.dashboardId(), tabs[0].id], { replaceUrl: true });
      }
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
