import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { LoginActionsGroup } from './login.actions';

export interface LoginState {
  isLoggedIn: boolean;
  error: HttpErrorResponse | null;
}

const initialLoginState: LoginState = {
  isLoggedIn: false,
  error: null,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(LoginActionsGroup.login, (state) => ({
    ...state,
    isLoggedIn: false,
    error: null,
  })),

  on(LoginActionsGroup.loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    error: null,
  })),

  on(LoginActionsGroup.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error,
  })),

  on(LoginActionsGroup.logout, () => initialLoginState),
);
