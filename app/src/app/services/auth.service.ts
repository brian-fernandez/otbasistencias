import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathService } from './urlPath.service';
import { UtilsService } from './Utils.service';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path: any;
  errorNoInternetMsg: string;
  user: any;
  constructor(
    private http: HttpClient,
    private paths: UrlPathService,
    private utils: UtilsService) {
    this.user = utils.credentials();
    this.path = this.paths.baseApiUrl;
    this.errorNoInternetMsg =
      'Se produjo un error, compruebe su conexión a internet.';

  }


  login(email,password): Observable<any> {
 const body = {
  "ci":email,
  "password":password
    }
    return this.http .post(   this.path + 'login',body   )
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(
           0 // this.utils.showMsg('Error', this.errorNoInternetMsg)
          );
        })
      );
  }

  guard(data){

    localStorage.setItem('dataUser',JSON.stringify(data));

  }


  get(){
    return JSON.parse(localStorage.getItem('dataUser'));
  }

}
