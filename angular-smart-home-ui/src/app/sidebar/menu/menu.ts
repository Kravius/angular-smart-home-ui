import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from 'app/common/service/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DashboardListItem } from 'app/models/models';
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
      map((data) => data['dashboardListItem'] as DashboardListItem[] | null)
    ),
    { initialValue: null }
  );
  test() {
    console.log(this.dashboardListItem(), 'dashboardListItem');
  }

  constructor() {
    effect(() => {
      const dashboards = this.dashboardListItem();

      if (!dashboards || dashboards.length === 0) return;
      const currentUrl = this.router.url;
      if (currentUrl === '/' || currentUrl === '') {
        this.router.navigate(['/dashboards', dashboards[0].id], { replaceUrl: true });
      }
    });
  }
}
