import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.reducers';
import { HttpStatusCode } from '@angular/common/http';
import { errorMessage } from '@consts/massages';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectIsLoggedIn = createSelector(selectLoginState, (state) => state.isLoggedIn);

export const selectLoginError = createSelector(selectLoginState, (state) => state.error);

export const selectUnauthorizedErrorMessage = createSelector(selectLoginError, (error) => {
  if (error?.status === HttpStatusCode.Unauthorized) {
    return errorMessage.invalidLogin;
  } else if (error) {
    return errorMessage.unknownLogin;
  }
  return '';
});
