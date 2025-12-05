import { Component, inject, signal } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { ApiService } from '../common/service/api.service';
import { DashboardData, Tab } from '../models/models';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly #appService = inject(ApiService);
  protected readonly data = signal<DashboardData>({ tabs: [] });

  public ngOnInit() {
    const dataApi = this.#appService.getDashboardData();

    dataApi.subscribe((data) => {
      this.data.set(data);
      console.log(data);
    });
  }
}
