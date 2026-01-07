import { Component, inject, input, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { DashboardData, DashboardListItem, ICard } from '../models/models';
import { ApiService } from '../common/service/api.service';
import { MatTabGroup, MatTab, MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { UpperCasePipe } from '@angular/common';

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
    UpperCasePipe,
  ],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  readonly #appService = inject(ApiService);
  private router = inject(Router);

  readonly dashboardId = input.required<string>();

  // protected data = signal<DashboardData>({ tabs: [] });
  protected activeLink = signal('');

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['tabResolver'])),
    { initialValue: null as DashboardData | null }
  );

  constructor() {
    // effect(() => {
    //   const dashboardId = this.dashboardId();

    //   this.#appService.getDashboardData(dashboardId).subscribe({
    //     next: (res) => {
    //       // this.data.set(res);
    //     },
    //     error: (err) => {
    //       console.error('нету табов:', err);
    //     },
    //   });
    // });

    effect(() => {
      console.log('test TabSwitcher');
      console.log(this.dashboardListTab().tabs, ' TabSwitcher');
      // console.log(this.data().tabs, ' TabSwitcher');
      const tabs = this.dashboardListTab().tabs;
      this.activeLink.set(tabs[0].id);
      if (!tabs || tabs.length === 0) return;
      const currentUrl = this.router.url;
      if (
        currentUrl === '/' ||
        currentUrl === '' ||
        currentUrl === '/dashboards' ||
        `/dashboards/${this.dashboardId()}`
      ) {
        this.router.navigate(['/dashboards', this.dashboardId(), tabs[0].id], { replaceUrl: true });
      }
    });
  }

  // public updateCard(updatedCard: ICard, tabId: string) {
  //   this.data.update((state) => ({
  //     ...state,
  //     tabs: state.tabs.map((tab) =>
  //       tab.id === tabId
  //         ? {
  //             ...tab,
  //             cards: tab.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
  //           }
  //         : tab
  //     ),
  //   }));
  // }
}
