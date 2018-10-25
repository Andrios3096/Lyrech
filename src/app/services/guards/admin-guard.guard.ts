import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { map,take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(public _AuthService:AuthService, public _AngularFireAuth:AngularFireAuth
    , public _Router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this._AuthService.user$
    .pipe(take(1))
    .pipe(map(user => user && user.roles ? true : false))
    .pipe(tap(isAdmin => {
      if (!isAdmin) {
        
        console.error('acces denied')
      }
     
    }))
  }
}
