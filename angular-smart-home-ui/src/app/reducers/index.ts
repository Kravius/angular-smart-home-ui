import { isDevMode } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { DashboardMenuState, menuDashboardReducer } from 'app/common/redux/dashboard.reducers';
import { loginReducer, LoginState } from 'app/login/redux/login.reducers';

export interface AppState {
  login: LoginState;
  dashboardMenu: DashboardMenuState;
}

export const reducers: ActionReducerMap<AppState> = {
  login: loginReducer,
  dashboardMenu: menuDashboardReducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action): AppState => {
    const nextState = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', nextState);
    console.groupEnd();
    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger] : [];
