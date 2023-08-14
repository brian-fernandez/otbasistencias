import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathService } from './urlPath.service';
import { UtilsService } from './Utils.service';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path: any;
  errorNoInternetMsg: string;
  user: any;
  httpOptions: any
  pathUser: any;
  httpOptionsForm: { headers: HttpHeaders; };
  httpOptionsTokenPush: { headers: HttpHeaders; };



  constructor(
    private http: HttpClient,
    private paths: UrlPathService,
    private utils: UtilsService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      })
    }
    this.httpOptionsForm = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
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


  guard(data) {

    localStorage.setItem('dataUser', JSON.stringify(data));

  }

  registerAfiliado(data): Observable<any> {
    // let body={
    //   "nombre": data.value.nombre ,
    //   "apellido": data.value.apellido,
    //   "direccion": data.value.direccion,
    //   "celular": data.value.celular,
    //   "telefono": data.value.telefono,
    //   "email":  data.value.email,
    //   "n_domicilio":  data.value.n_domicilio,
    //   "calle":  data.value.calle,
    //   "password":  data.value.contraseña,
    //   "ci":  data.value.ci
    // }


    return this.http.post(this.pathUser + 'usuarios/createUser', data)
    .pipe(
      tap((responseData: any) => {
        return responseData; // Retornar la respuesta del servidor
      }),
      catchError((error) => {
        return throwError(error);
      })
    );

  }


  get() {
    return JSON.parse(localStorage.getItem('dataUser'));
  }

  getId(id: any): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/show/' + id, {}, this.httpOptions)
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

    return this.http.post(this.pathUser + 'usuario/changePassword', body, this.httpOptions)
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
    return this.http.post(this.pathUser + 'usuario/showUser/' + id, {}, this.httpOptions)
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
    return this.http.post(this.pathUser + 'usuario/listaMultas/' + id, {}, this.httpOptions)
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
    return this.http.post(this.pathUser + 'usuario/updateCarnet/' + id, body, this.httpOptions)
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
    return this.http.post(this.pathUser + 'usuarios/edicionUsuario/' + id, data )
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
    return this.http.get(this.pathUser + 'usuario/listUser', this.httpOptions)
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
    return this.http.get(this.pathUser + 'usuario/listAfiliado', this.httpOptions)
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
    return this.http.get(this.pathUser + 'usuario/listAfiliadosPagos', this.httpOptions)
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
    return this.http.get(this.pathUser + 'cargo/list', this.httpOptions)
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
    return this.http.get(this.pathUser + 'usuario/listAfiliadoAll', this.httpOptions)
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
    return this.http.put(this.pathUser + 'cargo/asignar/' + idusuario + '/asignarRol', body, this.httpOptions)
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
    return this.http.post(this.pathUser + 'usuario/' + id + '/activate',{}, this.httpOptions)
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

  getEventosEnCurso():Observable<any>{
    return this.http.get(this.pathUser + 'eventos/getEventosEnCurso', this.httpOptions)
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
    return this.http.get(this.pathUser + 'eventos/showlist', this.httpOptions)
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

    return this.http.post(this.pathUser + 'eventos/create', body, this.httpOptions)
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
        "body": fecha + '\n' + hora_inicio + ' - ' + hora_fin + '\n ' + data.lugar + ' \n' + data.descripcion,
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

    return this.http.post(this.pathUser + 'usuario/createNotificaton', body, this.httpOptions).pipe(
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

    return this.http.get(this.pathUser + 'eventos/listcategorias', this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  getEventsActive(): Observable<any> {

    return this.http.get(this.pathUser + 'eventos/showlistActive', this.httpOptions).pipe(
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
    return this.http.post(this.pathUser + 'eventos/createAsunto', body, this.httpOptions).pipe(
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
    return this.http.post(this.pathUser + 'eventos/updateAsunto/' + id, body, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  deletedAsunto(id): Observable<any> {

    return this.http.delete(this.pathUser + 'eventos/deletedAsunto/' + id, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  getListEvents(): Observable<any> {

    return this.http.get(this.pathUser + 'eventos/listAsuntos', this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }

  //asistencia

  getEventoAsistencia(id): Observable<any> {

    return this.http.get(this.pathUser + 'eventos/eventId/' + id, this.httpOptions).pipe(
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

    return this.http.post(this.pathUser + 'eventos/crearAsistencia', body, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }


  //pagos
  getPagos(): Observable<any> {
    return this.http.get(this.pathUser + 'eventos/getMultas', this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  newPagos(data): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/pagarMultas', data, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  getpagoid(id): Observable<any> {
    return this.http.get(this.pathUser + 'usuario/pagos/' + id + '/multas', this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }



  //donaciones


  getDonacion(id): Observable<any> {
    return this.http.post(this.pathUser + 'usuario/listaAportes/' + id,{}, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }




  //reportes

  getUsersReportsG(){
    return this.http.get(this.pathUser + 'eventos/getUsersChartData', this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )

  }
  getActiveUsersChartData(){

    return this.http.get(this.pathUser + 'eventos/getActiveUsersChartData', this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  getEventosPorMes(year){

    return this.http.get(this.pathUser + 'eventos/getEventosPorMes/'+year, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }

  getBonosPorMes(year){
    return this.http.get(this.pathUser + 'eventos/getBonosPorMes/'+year, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }


  getUsersByFilters(data):Observable<any>{
    const body = {
      tipo : data.tipo ,
      estado: data.estado,
      calle: data.calle,
    }

    return this.http.post(this.pathUser + 'usuario/getUsersByFilters',body, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
    )
  }
  getEventsWithAttendance(data):Observable<any>{
    const body = {
      estado:data.estado,
      monto_recaudado_min:data.monto_recaudado_min,
      monto_recaudado_max:"1000",
      fecha_inicio : moment(data.fecha_inicio).format('YYYY-MM-DD'),
      fecha_fin: moment(data.fecha_final).format('YYYY-MM-DD')
    }



    return this.http.post(this.pathUser + 'usuario/getEventsWithAttendance',body, this.httpOptions).pipe(
      tap((data: any) => {
        return of(data);
      }), catchError((error) => {
        return throwError(error);
      })
      )
    }



    countActiveUsers():Observable<any>{


        return this.http.get(this.pathUser + 'usuario/countActiveUsers', this.httpOptions).pipe(
          tap((data: any) => {
            return of(data);
          }), catchError((error) => {
            return throwError(error);
          })
        )
      }
      countEventsThisMonth():Observable<any>{


        return this.http.get(this.pathUser + 'usuario/countEventsThisMonth', this.httpOptions).pipe(
          tap((data: any) => {
            return of(data);
          }), catchError((error) => {
            return throwError(error);
          })
        )
      }
      montoRecaudadoMesActual():Observable<any>{


        return this.http.get(this.pathUser + 'usuario/montoRecaudadoMesActual', this.httpOptions).pipe(
          tap((data: any) => {
            return of(data);
          }), catchError((error) => {
            return throwError(error);
          })
        )
      }





}





