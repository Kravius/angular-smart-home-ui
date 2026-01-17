import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, UserProfile } from '../../models/api-models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #apiService = inject(ApiService);

  readonly userProfile = signal<UserProfile>({ fullName: '', initials: '' });

  readonly token = signal<LoginResponse['token']>('');

  // isLoggedIn = computed(() => !!this.token());
  messageError = signal<string>('');

  constructor() {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      this.token.set(localStorageToken);
      this.loadProfileApi();
    }
  }

  public login(request: LoginRequest) {
    return this.#apiService.login(request);
  }

  public processLoginResponse(response: LoginResponse) {
    localStorage.setItem('token', response.token);
    this.token.set(response.token);
    this.loadProfileApi();
  }

  public logout() {
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
        this.userProfile.set(profile);
      },
      error: (err) => {
        console.error('Ошибка проверки токена:', err);
        this.logout();
      },
    });
  }
}
