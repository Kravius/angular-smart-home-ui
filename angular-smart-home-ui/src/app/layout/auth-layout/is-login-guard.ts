import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/common/service/auth.service';
import { selectIsLoggedIn } from 'app/login/redux/login.selectors';
import { State } from 'app/reducers';

// export const isLoginGuard: CanActivateFn = (route, state) => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   if (!auth.isLoggedIn()) {
//     return true;
//   }
//   return router.createUrlTree(['/dashboards']);
// };
export const isLoginGuard: CanActivateFn = (route, state) => {
  const store: Store<State> = inject(Store);
  const router = inject(Router);
  const isLoggedIn = store.selectSignal(selectIsLoggedIn);
  console.log(isLoggedIn());
  if (!isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/dashboards']);
};
