import { Component, inject, input, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { DashboardData } from '../models/models';
import { MatTabsModule } from '@angular/material/tabs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-tab-switcher',
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, MatTabsModule, UpperCasePipe],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSwitcher {
  private router = inject(Router);

  readonly dashboardId = input.required<string>();

  protected activeLink = signal('');

  readonly dashboardListTab = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['tabResolver'] as DashboardData)),
    { initialValue: { tabs: [] } }
  );

  constructor() {
    effect(() => {
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
}
