import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathService } from './urlPath.service';
import { UtilsService } from './Utils.service';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import * as moment from 'moment';
import { EncrDecrService } from './encr-decr.service';
import { Keysecret } from '../config/secretKeys';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Key = Keysecret.key;
  path: any;
  errorNoInternetMsg: string;
  user: any;
  httpOptions: any
  pathUser: any;
  httpOptionsForm: { headers: HttpHeaders; };
  httpOptionsTokenPush: { headers: HttpHeaders; };
  token: string;
  dataUser: any;



  constructor(
    private http: HttpClient,
    private paths: UrlPathService,
    private utils: UtilsService,
    private Encrypt:EncrDecrService) {
    this.token =  localStorage.getItem('token');
      this.token =  this.Encrypt.get(this.Key,this.token);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    this.httpOptionsForm = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    this.httpOptionsTokenPush = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'key=AAAAA9lcCxc:APA91bHJ06IzJz6fGj2HmcKJOEFeHAOaUnR0yIAZ5a8mI0bCm1tNJHyVxHEu4cglPu14IGAjnFkRFDCHImDcHOcSSEWrx0aSlJFWLePll1ibbA99EMkqdykqRExGWdSJJ9uMaHIsSqer'
      })
    }
    this.user = utils.credentials();
    this.path = this.paths.baseApiUrl;
    this.pathUser = this.paths.baseApiUrlUser;
    this.errorNoInternetMsg =
      'Se produjo un error, compruebe su conexión a internet.';

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
  guard(data) {

    localStorage.setItem('dataUser', JSON.stringify(data));

  }

  verificarUsuario(id): Observable<any> {


    return this.http.post(this.pathUser + 'usuarios/verificarUsuario/'+ id,{})
      .pipe(
        tap((responseData: any) => {
          return of (responseData); // Retornar la respuesta del servidor
        }),
        catchError((error) => {
          return throwError(error);
        })
      );

  }
  registerAfiliado(data): Observable<any> {


    return this.http.post(this.pathUser + 'usuarios/createUser', data)
      .pipe(
        tap((responseData: any) => {
          return of (responseData); // Retornar la respuesta del servidor
        }),
        catchError((error) => {
          return throwError(error);
        })
      );

  }




  get():Observable<any> {
    let user = localStorage.getItem('dataUser');
    user = this.Encrypt.get(this.Key,user);
    console.log('id '+ user);

    return this.http.post(this.pathUser + 'usuario/showUser/' + user, {}, this.updateToken())
      .pipe(
        tap((data: any) => {
          console.log(data);
          return of(data);

        }),
        catchError((error) => {
          return throwError(
            0 // this.utils.showMsg('Error', this.errorNoInternetMsg)
          );
        })
      );

  }

  getId(id: any): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/show/' + id, {}, this.updateToken())
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

  editpassword(id, password): Observable<any> {
    const body = {

      "id_user": id,
      "new_password": password

    }

    return this.http.post(this.pathUser + 'usuario/changePassword', body, this.updateToken())
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(error
          );
        })
      );
  }

  getUserEdit(id) {
    return this.http.post(this.pathUser + 'usuario/showUser/' + id, {}, this.updateToken())
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

  getMultasUserid(id): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/listaMultas/' + id, {}, this.updateToken())
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
  editCarnet(id, carnet): Observable<any> {
    const body = {
      "ci": carnet
    }
    return this.http.post(this.pathUser + 'usuario/updateCarnet/' + id, body, this.updateToken())
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(error)

        })
      )
  }

  editUser(id, data, foto): Observable<any> {
    return this.http.post(this.pathUser + 'usuarios/edicionUsuario/' + id, data)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(error)
        })
      );
  }



  getlist() {
    return this.http.get(this.pathUser + 'usuario/listUser', this.updateToken())
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
  getAfiliado() {
    return this.http.get(this.pathUser + 'usuario/listAfiliado', this.updateToken())
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
  getAfiliadoPagos() {
    return this.http.get(this.pathUser + 'usuario/listAfiliadosPagos', this.updateToken())
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

  listCargo() {
    return this.http.get(this.pathUser + 'cargo/list', this.updateToken())
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(0);
        })
      );
  }

  listUserAll() {
    return this.http.get(this.pathUser + 'usuario/listAfiliadoAll', this.updateToken())
      .pipe
      (
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(0)
        })
      );
  }

  selectCargo(idrol, idusuario) {
    const body = {
      "cargo_id": idrol
    }
    return this.http.put(this.pathUser + 'cargo/asignar/' + idusuario + '/asignarRol', body, this.updateToken())
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(0);
        })
      );
  }

  setEstado(id): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/' + id + '/activate', {}, this.updateToken())
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(0);
        })
      );
  }


  //eventos

  getEventosEnCurso(): Observable<any> {
    return this.http.get(this.pathUser + 'eventos/getEventosEnCurso', this.updateToken())
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(0);
        })
      );

  }

  getlistEvent(): Observable<any> {
    return this.http.get(this.pathUser + 'eventos/showlist', this.updateToken())
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((error) => {
          return throwError(0);
        })
      );
  }

  newEvent(data, id, eventos): Observable<any> {

    let body = {
      "nombre": data.value.nombre,
      "fecha": data.value.fecha,
      "hora_inicio": data.value.hora_inicio,
      "hora_fin": data.value.hora_fin,
      "descripcion": data.value.descripcion,
      "user_id": id,
      "estado": 1,
      "lugar": data.value.lugar,
      "monto_recaudado": "",
      "cant_multas": "",
      "obligatorio": data.value.obligatorio ? 1 : 0,
      "obligatorio_cant": "",
      "asunto_ids": eventos
    }

    if (data.value.obligatorio) {
      body.obligatorio_cant = data.value.obligatorio_cant;
    }

    return this.http.post(this.pathUser + 'eventos/create', body, this.updateToken())
      .pipe(
        tap((data: any) => {

          return of(data);
        }),
        catchError((error) => {
          return throwError(error);
        })
      );

  }




  senNotif(data, key): Observable<any> {
    let fecha = moment(data.fecha).format('YYYY-MM-DD');
    let hora_inicio = moment(data.hora_inicio).format('HH:mm a');
    let hora_fin = moment(data.hora_fin).format('HH:mm a');

    const body = {
      "to": key,
      "notification": {
        "body": fecha + '\n' + hora_inicio + ' - ' + hora_fin + '\n ' + data.lugar  + ' \n' + data.descripcion,
        "idEvent": data.id,
        "content_available": true,
        "priority": "high",
        "subtitle": "Elementary School",
        "title": data.nombre,
      }

    }
    return this.http.post('https://fcm.googleapis.com/fcm/send', body, this.httpOptionsTokenPush).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )



  }

  createNotification(data, type): Observable<any> {

    let fecha = moment(data.fecha).format('YYYY-MM-DD');
    let hora_inicio = moment(data.hora_inicio).format('HH:mm a');
    let hora_fin = moment(data.hora_fin).format('HH:mm a');
    const body = {
      "titulo": data.nombre,
      "fecha": moment(),
      "mensaje": data.descripcion,
      "type": type,
      "id_ty": data.id
    }

    return this.http.post(this.pathUser + 'usuario/createNotificaton', body, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }


  //asuntos

  //asuntos

  getCategoria(): Observable<any> {

    return this.http.get(this.pathUser + 'eventos/listcategorias', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  getEventsActive(): Observable<any> {

    return this.http.get(this.pathUser + 'eventos/showlistActive', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  createAsunto(data): Observable<any> {

    const body = {
      "titulo": data.value.titulo,
      "descripcion": data.value.descripcion,
      "estado": data.value.estado,
      "id_categoria": data.value.id_categoria,
      "id_user": data.value.id_user,
      "idevento": data.value.idevento,
      "fecha": new Date()
    }
    return this.http.post(this.pathUser + 'eventos/createAsunto', body, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }


  updateAsunto(data, id): Observable<any> {

    const body = {
      "titulo": data.value.tituloe,
      "descripcion": data.value.descripcione,
      "estado": data.value.estadoe,
      "id_categoria": data.value.id_categoriae,
      "idevento": data.value.ideventoe,
    }
    return this.http.post(this.pathUser + 'eventos/updateAsunto/' + id, body, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  deletedAsunto(id): Observable<any> {

    return this.http.delete(this.pathUser + 'eventos/deletedAsunto/' + id, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  getListEvents(): Observable<any> {

    return this.http.get(this.pathUser + 'eventos/listAsuntos', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  //asistencia

  getEventoAsistencia(id): Observable<any> {

    return this.http.get(this.pathUser + 'eventos/eventId/' + id, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  registrarAsistencia(idEvento, idUser, CantBono) {

    const body = {
      "id_user": idUser,
      "idevento": idEvento,
      "bono_cantidad": CantBono

    }

    return this.http.post(this.pathUser + 'eventos/crearAsistencia', body, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }


  //pagos
  getPagos(): Observable<any> {
    return this.http.get(this.pathUser + 'eventos/getMultas', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  newPagos(data): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/pagarMultas', data, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  getpagoid(id): Observable<any> {
    return this.http.get(this.pathUser + 'usuario/pagos/' + id + '/multas', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }



  //donaciones


  getDonacion(id): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/listaAportes/' + id, {}, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }




  //reportes

  getUsersReportsG() {
    return this.http.get(this.pathUser + 'eventos/getUsersChartData', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }
  getActiveUsersChartData() {

    return this.http.get(this.pathUser + 'eventos/getActiveUsersChartData', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  getEventosPorMes(year) {

    return this.http.get(this.pathUser + 'eventos/getEventosPorMes/' + year, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  getBonosPorMes(year) {
    return this.http.get(this.pathUser + 'eventos/getBonosPorMes/' + year, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }


  getUsersByFilters(data): Observable<any> {
    const body = {
      tipo: data.tipo,
      estado: data.estado,
      calle: data.calle,
    }

    return this.http.post(this.pathUser + 'usuario/getUsersByFilters', body, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }
  getEventsWithAttendance(data): Observable<any> {
    const body = {
      estado: data.estado,
      monto_recaudado_min: data.monto_recaudado_min,
      monto_recaudado_max: "1000",
      fecha_inicio: moment(data.fecha_inicio).format('YYYY-MM-DD'),
      fecha_fin: moment(data.fecha_final).format('YYYY-MM-DD')
    }



    return this.http.post(this.pathUser + 'usuario/getEventsWithAttendance', body, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }



  countActiveUsers(): Observable<any> {


    return this.http.get(this.pathUser + 'usuario/countActiveUsers', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }
  countEventsThisMonth(): Observable<any> {


    return this.http.get(this.pathUser + 'usuario/countEventsThisMonth', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }
  montoRecaudadoMesActual(): Observable<any> {


    return this.http.get(this.pathUser + 'usuario/montoRecaudadoMesActual', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  uploadImg(img, id): Observable<any> {

    const body = {
      "src_foto":img
    }
    return this.http.post(this.pathUser + 'usuarios/updateProfileImage/' + id, body, this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  imageGet(): Observable<any> {
    return this.http.get('https://res.cloudinary.com/dhiakxvol/image/upload/v1692078245/samples/usuarios/16794942523147_t6zydr.jpg', this.updateToken()).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  subdominioimg(img) {

    return this.http.post('https://api.imgbb.com/1/upload',img).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }
}





