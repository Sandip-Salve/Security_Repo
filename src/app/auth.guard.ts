import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const isLoggedIn = loginService.isLoggedIn();
  if(!isLoggedIn){
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
