import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
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
  readonly #store: Store<AppState> = inject(Store);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = inject(LoginForm);
  userProfile = computed(() => this.authService.userProfile());

  userLogout() {
    this.#store.dispatch(LoginActionsGroup.logout());
    this.router.navigate(['/login']);
  }
}
