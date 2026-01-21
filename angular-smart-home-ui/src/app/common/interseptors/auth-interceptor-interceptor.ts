import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token') ?? '';

  if (!token) {
    return next(request);
  }
  const updateReq = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(updateReq);
};
