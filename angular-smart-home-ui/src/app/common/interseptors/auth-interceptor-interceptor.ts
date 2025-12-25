import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
// import { AuthService } from '../service/auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (request, next) => {
  // const authService = inject(AuthService);
  // const token = authService.token();
 const token = (() => {
    try {
      return inject(AuthService).token();
    } catch {
      return null;
    }
  })();
  
  console.log(token);
  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
