import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ApiService } from 'app/common/service/api.service';
import { DashboardTabsData } from 'app/models/models';
import { catchError, of } from 'rxjs';

export const tabResolver: ResolveFn<DashboardTabsData | null> = (route, state) => {
  const api = inject(ApiService);
  const dashboardId = route.paramMap.get('dashboardId');
  if (!dashboardId) {
    return of(null);
  }
  return api.getDashboardTabsData(dashboardId).pipe(
    catchError((err) => {
      console.error('Menu resolver error', err);
      return of(null);
    })
  );
};
