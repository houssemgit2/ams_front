import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from '../services/authentication';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Authentication);
  const router = inject(Router);

  if (authService.isUserLoggedIn()) {
    return true;
  }

  router.navigate(['/signin']);
  return false;
};
