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
  // isLoggedIn = computed(() => false);

  constructor() {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      this.token.set(localStorageToken);
      console.log(this.userProfile(), 'before localStorageToken userProfile');
      this.loadProfileApi();
      console.log(this.userProfile(), 'after localStorageToken userProfile');
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
    this.loadProfileApi();
  }

  logout() {
    // this.token.set('');
    // this.userProfile.set({ fullName: '', initials: '' });
    // localStorage.removeItem('token');
    console.log(this.userProfile(), 'logout userProfile');
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
