import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from 'app/models/api-models';

export const loginApi = 'Login API';

export const LoginActionsGroup = createActionGroup({
  source: loginApi,
  events: {
    Login: props<{ request: LoginRequest }>(),
    'Login Success': props<{ response: LoginResponse }>(),
    'Login Failure': props<{ error: HttpErrorResponse }>(),

    Logout: emptyProps(),
  },
});
