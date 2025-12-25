import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const isGuestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  console.log(auth.token());

  if (auth.isLoggedIn()) return true;

  return router.createUrlTree(['/login']);
};
