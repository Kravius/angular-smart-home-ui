import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from 'app/common/service/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DashboardTabsData, DashboardListItem } from 'app/models/models';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  dashboardsDataAPI = inject(ApiService);
  readonly #router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly DashboardListItem = toSignal(
    inject(ActivatedRoute).data.pipe(
      map((data) => data['DashboardListItem'] as DashboardListItem[]),
    ),
    { initialValue: [] },
  );

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['tabResolver'] as DashboardTabsData)),
    { initialValue: { tabs: [] } },
  );

  readonly dashboardId = toSignal(
    this.route.url.pipe(
      map(() => this.route.firstChild),
      filter((route): route is ActivatedRoute => !!route),
      switchMap((route) => route.paramMap),
      map((params) => params.get('dashboardId') ?? ''),
    ),
    { initialValue: '' },
  );

  constructor() {
    effect(() => {
      const dashboards = this.DashboardListItem();
      console.log(dashboards);
      if (!dashboards || dashboards.length === 0) return;
      const currentUrl = this.#router.url;
      if (currentUrl === '/' || currentUrl === '' || currentUrl === '/dashboards') {
        this.#router.navigate(['/dashboards', dashboards[0].id], { replaceUrl: true });
      }
    });
  }

  isActiveLink(id: string) {
    return this.dashboardId() === id;
  }
}
