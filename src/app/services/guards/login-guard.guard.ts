import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { map,take, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _AuthService:AuthService, public _AngularFireAuth:AngularFireAuth
    , public _Router:Router){}

  canActivate(){
    return this._AuthService._AngularFireAuth.authState 
    .pipe(take(1)) 
    .pipe(map(authState => !!authState)) 
    .pipe(tap(authenticated =>{ 
      if(!authenticated){ 
        console.log('no pasaste pe tio ')
        this._Router.navigate(['/login']);
  } 
})) 
    
  }
}
