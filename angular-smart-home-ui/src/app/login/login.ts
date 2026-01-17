import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Injector,
  DestroyRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgClass } from '@angular/common';

import { Router } from '@angular/router';
import { LoginForm } from 'app/common/service/login-form.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { selectIsLoggedIn, selectUnauthorizedErrorMessage } from './redux/login.selectors';
import { LoginActionsGroup } from './redux/login.actions';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, EMPTY, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  readonly #store: Store<AppState> = inject(Store);
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #injector = inject(Injector);

  protected readonly isLoggedIn = this.#store.selectSignal(selectIsLoggedIn);
  loginForm = inject(LoginForm);
  unauthorizedErrorMessage = this.#store.selectSignal(selectUnauthorizedErrorMessage);

  protected ngOnInit(): void {
    // TODO read about it injector: this.#injector
    toObservable(this.isLoggedIn, { injector: this.#injector })
      .pipe(
        distinctUntilChanged(),
        filter((isLoggedIn) => isLoggedIn),
        switchMap(() => {
          this.#router.navigateByUrl('/dashboards');
          this.loginForm.reset();
          this.loginForm.userForm.markAsPristine();
          this.loginForm.userForm.markAsUntouched();
          return EMPTY;
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submitLogin() {
    const { username, password } = this.loginForm.userForm.getRawValue();
    if (username && password) {
      this.#store.dispatch(
        LoginActionsGroup.login({
          request: { userName: username, password: password },
        }),
      );
    }
  }
}
