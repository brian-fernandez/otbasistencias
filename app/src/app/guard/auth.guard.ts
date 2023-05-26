import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Keysecret } from '../config/secretKeys';
import { EncrDecrService } from '../services/encr-decr.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private Key = Keysecret.key;

  constructor(
    private router: Router,
    private EncrypDescryp: EncrDecrService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const email = this.EncrypDescryp.set(this.Key, localStorage.getItem('email')) || false;
    const password = this.EncrypDescryp.set(this.Key, localStorage.getItem('password')) || false;
    console.log(email + '  ' + password);

    if (email && password) {
      console.log('entro a if de guard');
      return true;
    }
    return false;

  }

}
