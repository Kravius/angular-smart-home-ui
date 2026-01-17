import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { LoginActionsGroup } from './login.actions';

export interface LoginState {
  isLoggedIn: boolean;
  error?: HttpErrorResponse;
}

const initialLoginState: LoginState = {
  isLoggedIn: false,
  error: undefined,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(LoginActionsGroup.login, (state) => ({
    ...state,
    isLoggedIn: false,
    error: undefined,
  })),

  on(LoginActionsGroup.loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    error: undefined,
  })),

  on(LoginActionsGroup.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error,
  })),

  on(LoginActionsGroup.logout, () => initialLoginState)
);
