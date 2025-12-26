import { Routes } from '@angular/router';
import { isGuestGuard } from './layout/app-layout/is-guest-guard';
import { isLoginGuard } from './layout/auth-layout/is-login-guard';
import { AuthLayout } from './layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/app-layout/app-layout').then((m) => m.AppLayout),
    canActivate: [isGuestGuard],
    children: [
      { path: '', loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard) },
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
