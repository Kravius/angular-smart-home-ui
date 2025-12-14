import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabSwitcher } from '../tab-switcher/tab-switcher';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, TabSwitcher],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
