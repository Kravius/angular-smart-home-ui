import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
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
      if (this.authService.isLoggedIn()) this.router.navigateByUrl('/');
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginInPage() {
    const user = this.loginForm.userForm.value.username;
    const pas = this.loginForm.userForm.value.password;
    if (user && pas) {
      this.authService.login({
        userName: user,
        password: pas,
      });
    }
  }
}
