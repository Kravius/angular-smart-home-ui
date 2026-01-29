import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthService } from 'app/common/service/auth.service';
import { LoginActionsGroup } from './login.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class LoginEffects {
  readonly #actions = inject(Actions);
  readonly #authApiService = inject(AuthService);

  readonly login = createEffect(() => {
    return this.#actions.pipe(
      ofType(LoginActionsGroup.login),
      exhaustMap((value) =>
        this.#authApiService.login(value.request).pipe(
          map((response) => LoginActionsGroup.loginSuccess({ response })),
          catchError((error) => of(LoginActionsGroup.loginFailure({ error }))),
        ),
      ),
    );
  });

  readonly loginSuccess = createEffect(
    () => {
      return this.#actions.pipe(
        ofType(LoginActionsGroup.loginSuccess),
        tap(({ response }) => {
          this.#authApiService.processLoginResponse(response);
        }),
      );
    },
    { dispatch: false },
  );

  readonly checkToken = createEffect(() =>
    this.#actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const token = localStorage.getItem('token');

        if (!token) {
          return LoginActionsGroup.logout();
        }

        return LoginActionsGroup.loginSuccess({
          response: { token },
        });
      }),
    ),
  );

  protected readonly logout = createEffect(
    () => {
      return this.#actions.pipe(
        ofType(LoginActionsGroup.logout),
        tap(() => {
          this.#authApiService.logout();
        }),
      );
    },
    { dispatch: false },
  );
}
