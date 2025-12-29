import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ApiService } from 'app/common/service/api.service';
import { DashboardData, DashboardListItem } from 'app/models/models';
import { catchError, of } from 'rxjs';

// export const tabResolver: ResolveFn<DashboardData> = (route, state) => {
//   const api = inject(ApiService);
//   return api.getDashboardData().pipe(
//     catchError((err) => {
//       console.error('Menu tab error', err);
//       return of(null);
//     })
//   );
// };

// export const menuResolver: ResolveFn<DashboardListItem | null> = (route, state) => {
//   const api = inject(ApiService);

//   return api.getDashboardListItem().pipe(
//     catchError((err) => {
//       console.error('Menu resolver error', err);
//       return of(null);
//     })
//   );
// };
