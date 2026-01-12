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
import { ApiService } from 'app/common/service/api.service';
import { AuthService } from 'app/common/service/auth.service';
import { LoginForm } from 'app/common/service/login-form.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = inject(LoginForm);
  userProfile = computed(() => this.authService.userProfile());

  userLogout() {
    this.authService.logout();
    this.loginForm.reset();
    this.router.navigate(['/login']);
  }
}
