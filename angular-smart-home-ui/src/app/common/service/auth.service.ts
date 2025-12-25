import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse } from '../../models/api-models';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter,
  interval,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #apiService = inject(ApiService);
  readonly loginSubject = new BehaviorSubject<LoginRequest>({
    userName: '',
    password: '',
  });

  token = signal<LoginResponse['token']>('');

  constructor() {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      this.token.set(JSON.parse(localStorageToken));
    }

    this.loginSubject
      .asObservable()
      .pipe(
        filter((payload) => {
          return !!payload.password && !!payload.userName;
        }),
        switchMap((payload) => {
          return this.#apiService.login(payload).pipe(map((request) => request));
        }),

        catchError((error) => {
          console.log(error);
          return EMPTY;
        }),
        takeUntilDestroyed()
      )
      .subscribe((request) => {
        this.token.set(request.token);
        localStorage.setItem('token', JSON.stringify(request.token));
      });
  }

  public login(payload: LoginRequest) {
    this.loginSubject.next(payload);
  }
}
