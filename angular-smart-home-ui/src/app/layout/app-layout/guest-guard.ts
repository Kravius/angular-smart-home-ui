import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/common/service/auth.service';
import { selectIsLoggedIn } from 'app/login/redux/login.selectors';

// export const guestGuardFn: CanActivateFn = (route, state) => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   if (auth.isLoggedIn()) return true;
//   return router.createUrlTree(['/login']);
// };

export const guestGuardFn: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const isLoggedIn = store.selectSignal(selectIsLoggedIn);
  const router = inject(Router);

  if (isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};
