import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';
import { FirebaseService } from '../site/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class isLogoutGuard implements CanActivate {
  constructor(private authSvc: FirebaseService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (!localStorage.getItem('usuario')) {
      return true;
    } else {
      this.router.navigate(['/site/home-site']);
      return false;
    }


  }
}
