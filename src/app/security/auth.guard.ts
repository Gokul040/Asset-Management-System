import {inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { TokenStorageService } from './token-storage.service';

export const authGuard: CanActivateFn = (route,
state)=> {
    const storageService = inject(TokenStorageService);
    const router = inject(Router);
    const token = window.sessionStorage.getItem('token');
    const expiryDate = new Date(token!.split('.')[1]);
    const params = route.params;

    if (expiryDate < new Date()) {
      // Token has expired, so log out the user
      storageService.logOut();
      router.navigate(['/login'])
      return false;
    } else if (!params) {
      storageService.logOut();
      return false;
    }
    else {
      // Token is still valid, so allow the user to access the route
      return true;
    }
}


  // api = this.inject.get(NetworkCallService)


  //  isLoggedIn(): boolean {
  //    return !!window.sessionStorage.getItem('token')
  //  }
  // canActivate(route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   const token = window.sessionStorage.getItem('token');

  //   const expiryDate = new Date(token!.split('.')[1]);
  //   const params = route.params;

  //   if (expiryDate < new Date() && this.isLoggedIn()) {
  //     // Token has expired, so log out the user
  //     this.storageService.logOut();
  //     this.router.navigate(['/login'])
  //     return false;
  //   } else if (!params) {
  //     this.storageService.logOut();
  //     return false;
  //   }
  //   else {
  //     // Token is still valid, so allow the user to access the route
  //     return true;
  //   }
  // }


