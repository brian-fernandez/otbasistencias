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
    private EncrypDescryp : EncrDecrService
) {

}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('entro');
      var encrypt = this.EncrypDescryp.set(this.Key, 'hola mundoooooooo');

      var descryp = this.EncrypDescryp.get(this.Key, encrypt);
      console.log(encrypt);

      console.log('descript ' +  descryp);


    // this.router.navigateByUrl('/sesion');
    return true;
}

}
