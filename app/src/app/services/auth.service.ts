import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathService } from './urlPath.service';
import { UtilsService } from './Utils.service';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { EncrDecrService } from './encr-decr.service';
import { Keysecret } from '../config/secretKeys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Key = Keysecret.key;
  path: any;
  errorNoInternetMsg: string;
  user: any;
  httpOptions: { headers: any; };
  httpOptions2: { headers: any; };
  pathUser: string;
  token: string;
  constructor(
    private http: HttpClient,
    private paths: UrlPathService,
    private utils: UtilsService,
    private Encrypt:EncrDecrService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'key=AAAAA9lcCxc:APA91bHJ06IzJz6fGj2HmcKJOEFeHAOaUnR0yIAZ5a8mI0bCm1tNJHyVxHEu4cglPu14IGAjnFkRFDCHImDcHOcSSEWrx0aSlJFWLePll1ibbA99EMkqdykqRExGWdSJJ9uMaHIsSqer'
      })
    }

    this.httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }

    this.user = utils.credentials();
    this.path = this.paths.baseApiUrl;
    this.pathUser = this.paths.baseApiUrlUser;
    this.errorNoInternetMsg =
      'Se produjo un error, compruebe su conexión a internet.';

  }


  login(email, password): Observable<any> {
    const body = {
      "ci": email,
      "password": password
    }
    return this.http.post(this.path + 'loginPanel', body)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  guard(data) {

    localStorage.setItem('dataUser', data);

  }

  updateToken() {
    this.token =  localStorage.getItem('token');
      this.token =  this.Encrypt.get(this.Key,this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
    return httpOptions;
  }

  get() {
    let user = localStorage.getItem('dataUser');
    user = this.Encrypt.get(this.Key,user);
    this.getUserid(user).subscribe(
      async (params:any) => {
        return params;
      }
    )
    return
  }

  getUserid(id):Observable<any>{

    return this.http.post(this.pathUser + 'usuario/showUser/'+id,{}, this.updateToken())
    .pipe(
      tap((responseData: any) => {
        return of (responseData); // Retornar la respuesta del servidor
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getKey(): Observable<any> {

    return this.http.get(this.pathUser + 'usuario/sendNotification', this.updateToken())
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

  sendNotif(tokenList): Observable<any> {



      const body = {
        "to": tokenList,
        "notification": {
          "body": "New announcement assigned",
          "OrganizationId": "2",
          "content_available": true,
          "priority": "high",
          "subtitle": "Elementary School",
          "title": "hello",
          "image": "https://developers.google.com/static/chat/images/auth-asynchronous.png"
        },
        "data": {
          "priority": "high",
          "sound": "app_sound.wav",
          "content_available": true,
          "bodyText": "New Announcement assigned",
          "organization": "Elementary school"
        }
      }
      return this.http.post('https://fcm.googleapis.com/fcm/send', body, this.httpOptions).pipe(
        tap((data: any) => {
          return of(data);
        }), catchError((error) => {
          return throwError(error);
        })
      )


  }

}
