import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from 'app/login/redux/login.selectors';
import { AppState } from 'app/reducers';

export const guestGuardFn: CanActivateFn = (route, state) => {
  const store: Store<AppState> = inject(Store);
  const isLoggedIn = store.selectSignal(selectIsLoggedIn);
  const router = inject(Router);

  if (isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};
