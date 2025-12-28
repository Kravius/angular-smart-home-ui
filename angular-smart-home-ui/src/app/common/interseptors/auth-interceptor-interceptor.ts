import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (request, next) => {
  // const authService = inject(AuthService);
  const token = localStorage.getItem('token') ?? '';
  // const test = token ? JSON.parse(token) : '';
  //написать логику доставать с локаласторедж
  // const token = authService.token();
  // console.log(test, 'HttpInterceptorFn');

  if (!token) {
    return next(request);
  }
  const updateReq = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return next(updateReq);
};
