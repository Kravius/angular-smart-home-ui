import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../common/service/auth.service';
import { NgClass } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);
  userName = signal<string>('');
  password = signal<string>('');

  constructor() {
    // посмотреть нужно ли тут ридерект
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
    this.authService.login({ userName: this.userName(), password: this.password() });
  }
}
