import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from 'app/common/service/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DashboardListItem } from 'app/models/models';
import { map } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Menu {
  dashboardsDataAPI = inject(ApiService);
  readonly dashboardListItem = toSignal(
    inject(ActivatedRoute).data.pipe(
      map((data) => data['dashboardListItem'] as DashboardListItem[] | null)
    ),
    { initialValue: null }
  );
}
