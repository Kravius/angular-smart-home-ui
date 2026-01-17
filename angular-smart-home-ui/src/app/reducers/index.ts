import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { loginReducer, LoginState } from 'app/login/redux/login.reducers';
// import { loginReducer, LoginState } from '../login/redux/login.reducers';

export interface State {
  login: LoginState;
}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State | undefined, action: Action): State => {
    const nextState = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', nextState);
    console.groupEnd();
    return nextState;
  };
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [logger] : [];
