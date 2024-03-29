import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';
import { FirebaseService } from '../site/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: FirebaseService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

setTimeout(function(){
}, 500);//wait 2 seconds
    if (localStorage.getItem('usuario')) {
      return true;
    } else {
      this.router.navigate(['/site/login']);
      return false;
    }


  }
}

// this.authSvc.user$.pipe(
//   take(1),
//   map((user) => {
//     if (user) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   })
// );