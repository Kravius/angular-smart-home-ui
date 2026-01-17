import { SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';
import { ApiService } from 'app/common/service/api.service';
import { AuthService } from 'app/common/service/auth.service';
import { LoginForm } from 'app/common/service/login-form.service';
import { LoginActionsGroup } from 'app/login/redux/login.actions';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly #store: Store<State> = inject(Store);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = inject(LoginForm);
  userProfile = computed(() => this.authService.userProfile());

  userLogout() {
    this.#store.dispatch(LoginActionsGroup.logout());
    // this.authService.logout();
    // this.loginForm.reset();
    this.router.navigate(['/login']);
  }
}
