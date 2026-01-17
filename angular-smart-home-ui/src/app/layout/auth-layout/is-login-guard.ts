import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from 'app/login/redux/login.selectors';
import { AppState } from 'app/reducers';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const store: Store<AppState> = inject(Store);
  const router = inject(Router);
  const isLoggedIn = store.selectSignal(selectIsLoggedIn);
  console.log(isLoggedIn());
  if (!isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/dashboards']);
};
