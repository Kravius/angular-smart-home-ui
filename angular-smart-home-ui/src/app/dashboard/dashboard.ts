import { Component, inject, signal } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from '../common/service/api.service';
import { DashboardData, ICard } from '../models/models';
import { TabSwitcher } from '../tab-switcher/tab-switcher';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
