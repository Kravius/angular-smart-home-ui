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
  // public readonly data = signal<Tab | []>([]);
  public readonly data = signal({});
  readonly tabId = input.required<string>();
  readonly dashboardId = input.required<string>();
  readonly #appService = inject(ApiService);

  // public readonly cardChange = output<ICard>();

  // handleCardChange(card: ICard) {
  //   this.cardChange.emit(card);
  // }

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).parent!.data.pipe(map((data) => data['tabResolver'])),
    { initialValue: null as DashboardData | null }
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

  constructor() {
    // effect(() => {
    //   const data = this.data();
    //   const tabId = this.tabId();
    //   if (!data.tabs.length) return;
    //   const exists = data.tabs.some((t) => t.id === tabId);
    //   if (!exists) {
    //     this.router.navigate(['/dashboards', this.dashboardId(), data.tabs[0].id]);
    //   }
    // });
  }
}
