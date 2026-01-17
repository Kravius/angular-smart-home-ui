import { Routes } from '@angular/router';
import { guestGuardFn } from './layout/app-layout/guest-guard';
import { isLoginGuard } from './layout/auth-layout/is-login-guard';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { menuResolver } from './sidebar/menu/menu-resolver';
import { tabResolver } from './sidebar/menu/tab-resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'dashboards',
    loadComponent: () => import('./layout/app-layout/app-layout').then((m) => m.AppLayout),
    canActivate: [guestGuardFn],
    resolve: { DashboardListItem: menuResolver },
    children: [
      {
        path: ':dashboardId',
        loadComponent: () => import('./tab-switcher/tab-switcher').then((m) => m.TabSwitcher),
        resolve: { tabResolver: tabResolver },
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
