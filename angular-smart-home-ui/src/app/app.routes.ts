import { Routes } from '@angular/router';
import { guestGuardFn } from './layout/app-layout/guest-guard';
import { isLoginGuard } from './layout/auth-layout/is-login-guard';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { tabResolver } from './sidebar/menu/tab-resolver';
import { provideEffects } from '@ngrx/effects';
import { DashboardEffects } from './common/redux/dashboard.effects';
import { DashboardTabsEffects } from './common/redux/tabs/tabs.effects';
import { DashboardDevicesEffects } from './device/reducer/devices.effects';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'dashboards',
    loadComponent: () => import('./layout/app-layout/app-layout').then((m) => m.AppLayout),
    canActivate: [guestGuardFn],
    // resolve: { DashboardListItem: menuResolver }, //TODO: check work in future
    providers: [
      provideEffects(DashboardEffects),
      provideEffects(DashboardTabsEffects), //TODO change
      provideEffects(DashboardDevicesEffects),
    ],
    children: [
      {
        path: ':dashboardId',
        loadComponent: () => import('./tab-switcher/tab-switcher').then((m) => m.TabSwitcher),
        // providers: [provideEffects(DashboardTabsEffects)], //TODO: check work in future
        // resolve: { tabResolver: tabResolver },  //TODO: check work in future
        title: (route) => `${route.params['dashboardId']}`,
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: ':tabId',
            loadComponent: () => import('./card-list/card-list').then((m) => m.CardList),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: AuthLayout,
    canActivate: [isLoginGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./login/login').then((m) => m.Login),
      },
    ],
  },
  { path: '**', loadComponent: () => import('./layout/not-page/not-page').then((m) => m.NotPage) },
];
