import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Sidebar } from 'app/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { MenuDashboardActionsGroup } from 'app/common/redux/dashboard.actions';
import { DevicesActionsGroup } from 'app/device/reducer/devices.actions';

@Component({
  selector: 'app-app-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  readonly #store: Store<AppState> = inject(Store);

  ngOnInit() {
    this.#store.dispatch(MenuDashboardActionsGroup.getDashboardMenuItems());
    this.#store.dispatch(DevicesActionsGroup.getAllDevices());
  }
}
