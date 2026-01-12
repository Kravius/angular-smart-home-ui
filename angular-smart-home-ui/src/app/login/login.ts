import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  effect,
  computed,
} from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../common/service/auth.service';
import { NgClass } from '@angular/common';

import { Router } from '@angular/router';
import { LoginForm } from 'app/common/service/login-form.service';

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
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = inject(LoginForm);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) this.router.navigateByUrl('/dashboards');
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginInPage() {
    const { username, password } = this.loginForm.userForm.getRawValue();
    if (username && password) {
      this.authService.login({
        userName: username,
        password: password,
      });
    }
  }

  loginErrorMassage() {
    return this.authService.messageError();
  }

  isInvalidCredentials = computed(() => this.authService.messageError() === '401');
}
