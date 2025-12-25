import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse } from '../../models/api-models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #apiService = inject(ApiService);

  readonly loginPayLoad = signal<LoginRequest>({
    userName: '',
    password: '',
  });

  readonly token = signal<LoginResponse['token']>('');

  isLoggedIn = computed(() => !!this.token());
  // isLoggedIn = computed(() => false);

  constructor() {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      console.log(localStorageToken, 'localStorageToken');
      this.token.set(localStorageToken);
    }

    effect(() => {
      const payload = this.loginPayLoad();
      if (!payload?.password || !payload?.userName) return;

      this.#apiService.login(payload).subscribe({
        next: (res) => {
          console.log(res.token);
          this.token.set(res.token);
          localStorage.setItem('token', JSON.stringify(res.token));
        },
        error: console.error,
      });
    });
  }

  public login(payload: LoginRequest) {
    console.log(payload);
    this.loginPayLoad.set(payload);
  }
}
