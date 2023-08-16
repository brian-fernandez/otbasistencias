import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Keysecret } from '../config/secretKeys';
import { EncrDecrService } from '../services/encr-decr.service';
import { UserService } from '../services/user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private Key = Keysecret.key;
  very: any;

  constructor(
    private router: Router,
    private EncrypDescryp: EncrDecrService,
    private userService:UserService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      let id;
      id = this.EncrypDescryp.get(this.Key, localStorage.getItem('dataUser'));
      return this.userService.verificarUsuario(id).pipe(
        map((params: any) => {
          this.very = params;
          if (this.very) {
            return true;
          } else {
            this.router.navigateByUrl('/sesion');
            return false;
          }
        }),
        catchError((error) => {
       
          this.router.navigateByUrl('/sesion');
          return of(false);
        })
      );



      // const email =  localStorage.getItem('dataUser') || false;
      // const password =  localStorage.getItem('token')|| false;
      // if (email && password) {
      //   console.log('entro a if de guard');
      //   return true;
      // }
      // return false;

    }






}


