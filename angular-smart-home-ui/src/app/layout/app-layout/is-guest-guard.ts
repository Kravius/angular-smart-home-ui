import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../common/service/auth.service';
import { ApiService } from 'app/common/service/api.service';

export const isGuestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  // const apiService = inject(ApiService);
  // console.log(auth.token());

  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};
