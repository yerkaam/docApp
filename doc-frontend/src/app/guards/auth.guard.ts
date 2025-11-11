import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Проверяем токен или делаем запрос к серверу
  return authService.checkAuth().pipe(
    map(() => true), // если сервер вернул 200 OK → пускаем
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
