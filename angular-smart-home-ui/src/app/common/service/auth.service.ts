import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, UserProfile } from '../../models/api-models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #apiService = inject(ApiService);

  readonly loginPayLoad = signal<LoginRequest>({
    userName: '',
    password: '',
  });

  readonly userProfile = signal<UserProfile>({ fullName: '', initials: '' });

  readonly token = signal<LoginResponse['token']>('');

  isLoggedIn = computed(() => !!this.token());
  isError = signal<number>(0);
  // isLoggedIn = computed(() => false);

  constructor() {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      this.token.set(localStorageToken);
      this.loadProfileApi();
    }

    effect(() => {
      const payload = this.loginPayLoad();
      if (!payload?.password || !payload?.userName) return;

      this.#apiService.login(payload).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.token.set(res.token);
          this.loadProfileApi();
        },
        error: (err) => {
          console.error('Ошибка проверки login:', err);
          this.isError.set(err.status);
        },
      });
    });
  }

  public login(payload: LoginRequest) {
    this.loginPayLoad.set(payload);
  }

  logout() {
    this.token.set('');
    this.userProfile.set({ fullName: '', initials: '' });
    localStorage.removeItem('token');
  }

  loadProfileApi() {
    if (this.userProfile().fullName && this.userProfile().initials) {
      return;
    }
    this.#apiService.checkToken().subscribe({
      next: (profile) => {
        console.log(profile);
        this.userProfile.set(profile);
      },
      error: (err) => {
        console.error('Ошибка проверки токена:', err);
        this.logout();
      },
    });
  }
}
