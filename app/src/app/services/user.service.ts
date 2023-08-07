import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathService } from './urlPath.service';
import { UtilsService } from './Utils.service';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path: any;
  errorNoInternetMsg: string;
  user: any;
  httpOptions:any
  pathUser: any;
  constructor(
    private http: HttpClient,
    private paths: UrlPathService,
    private utils: UtilsService) {

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accet' : 'application/json'
        })
      }
    this.user = utils.credentials();
    this.path = this.paths.baseApiUrl;
    this.pathUser = this.paths.baseApiUrlUser;
    console.log(this.pathUser);

    this.errorNoInternetMsg =
      'Se produjo un error, compruebe su conexión a internet.';

  }


  // list(): Observable<any> {
  //   return this.http.post(this.path + 'login', body)
  //     .pipe(
  //       tap((data: any) => {
  //         return of(data);
  //       }),
  //       catchError((error) => {
  //         return throwError(
  //           0 // this.utils.showMsg('Error', this.errorNoInternetMsg)
  //         );
  //       })
  //     );
  // }

  guard(data) {

    localStorage.setItem('dataUser', JSON.stringify(data));

  }


  get() {
    return JSON.parse(localStorage.getItem('dataUser'));
  }

  getId(id:any):Observable<any>{
    console.log(id);


    return this.http.post(this.pathUser + 'usuario/show/'+ id,{} ,this.httpOptions)
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

  getlist(){
    return this.http.get(this.pathUser + 'usuario/listUser' ,this.httpOptions)
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
  getAfiliado(){
    return this.http.get(this.pathUser + 'usuario/listAfiliado' ,this.httpOptions)
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

  listCargo(){
    return this.http.get(this.pathUser + 'cargo/list',this.httpOptions)
    .pipe(
      tap((data:any)=>{
        return of (data);
      }),
      catchError((error)=>{
        return throwError(0);
      })
    );
  }

  listUserAll(){
    return this.http.get(this.pathUser + 'usuario/listAfiliadoAll', this.httpOptions)
    .pipe
    (
      tap((data:any)=>{
        return of (data);
      }),
      catchError((error)=>{
        return throwError(0)
      })
    );
  }

  selectCargo(idrol,idusuario){
    const body = {
        "cargo_id":idrol
    }
    return this.http.put(this.pathUser + 'cargo/asignar/'+ idusuario+'/asignarRol',body,this.httpOptions)
    .pipe(
      tap((data:any)=>{
        return of (data);
      }),
      catchError((error)=>{
        return throwError(0);
      })
    );
  }

  setEstado(id):Observable<any>{
    return this.http.put(this.pathUser + 'usuario/'+ id+'/activate',this.httpOptions)
    .pipe(
      tap((data:any)=>{
        return of (data);
      }),
      catchError((error)=>{
        return throwError(0);
      })
    );
  }
}
