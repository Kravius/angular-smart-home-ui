import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from 'app/common/service/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DashboardData, DashboardListItem } from 'app/models/models';
import { map } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  dashboardsDataAPI = inject(ApiService);
  private router = inject(Router);

  readonly dashboardListItem = toSignal(
    inject(ActivatedRoute).data.pipe(
      map((data) => data['dashboardListItem'] as DashboardListItem[])
    ),
    { initialValue: [] }
  );

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['tabResolver'])),
    { initialValue: null as DashboardData | null }
  );

  test() {
    console.log(this.dashboardListTab(), 'tabResolver');
  }

  constructor() {
    effect(() => {
      const dashboards = this.dashboardListItem();

      if (!dashboards || dashboards.length === 0) return;
      const currentUrl = this.router.url;
      if (currentUrl === '/' || currentUrl === '' || currentUrl === '/dashboards') {
        this.router.navigate(['/dashboards', dashboards[0].id], { replaceUrl: true });
      }
    });

    effect(() => {
      const data = this.dashboardListTab();
      if (!data) return;

      console.log(data.tabs);
    });
  }
}
