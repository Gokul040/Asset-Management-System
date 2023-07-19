import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuardGuard  {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const userRole = window.sessionStorage.getItem('userRole');

      const isAuthorized = userRole?.includes(route.data['role'])

      if (!isAuthorized) {
        window.alert('you are not authorized');
      }
      return isAuthorized || false;
  }
  
}
