import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabSwitcher } from '../tab-switcher/tab-switcher';

import { Sidebar } from 'app/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { ApiService } from 'app/common/service/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, TabSwitcher, RouterOutlet, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  dashboardsDataAPI = inject(ApiService);
}
