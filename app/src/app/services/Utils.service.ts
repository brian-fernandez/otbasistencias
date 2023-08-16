import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AlertComponent } from '../alerts/alert/alert.component';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Keysecret } from '../config/secretKeys';
import { EncrDecrService } from './encr-decr.service';
import { UrlPathService } from './urlPath.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private Key = Keysecret.key;
  user: any;
  base64String: string;
  token: string;
  pathUser: string;

constructor(
private _snackBar:MatSnackBar,
private http:HttpClient,
public dialog: MatDialog,
private paths: UrlPathService,
private Encrypt:EncrDecrService
) {
  this.pathUser = this.paths.baseApiUrlUser;
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

  openSnackBar(text:any) {
    this._snackBar.open(text, 'Cerrar', {
      horizontalPosition: "start",
      verticalPosition: "bottom",
      duration:2000,
      panelClass: ['blue-snackbar']
    });
  }

  credentials(){
    const miObjetoRecuperado = localStorage.getItem('dataUser');
    let objetoRecuperado: any = null;

    if (miObjetoRecuperado !== null) {
      objetoRecuperado = this.Encrypt.get(this.Key,miObjetoRecuperado);
    }

    this.getUserid(objetoRecuperado).subscribe(
      async (params:any) => {


        return params;
      }
    )




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


  cargarImagenComoBase64(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  }


  convertImageToBase64(data) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', data, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString();
       return base64String ? base64String.split(',')[1] : '';
      };
      reader.readAsDataURL(xhr.response);
    };

    xhr.send();
  }

  convertPDF(html,titulo){

//     const canvasWidth = 3000; // Cambia esto al ancho deseado
// const canvasHeight =3000; // Cambia esto a la altura deseada
    const canvasWidth = 2412; // Cambia esto al ancho deseado
const canvasHeight =6392; // Cambia esto a la altura deseada
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
    const DATA: any = document.getElementById(html);

    const doc = new jsPDF('portrait', 'pt', 'letter'); // Cambiar 'px' por 'pt' y 'Letter' por 'letter'
    const options = {
      canvas:canvas,
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdfHeight,
        'FAST'
      );

      const remainingHeight = doc.internal.pageSize.getHeight() - (pdfHeight + bufferY);
      if (remainingHeight < 0) {
        doc.addPage(); // Agregar una nueva página
      }
      return doc;
    }).then((docResult) => {
      switch (titulo) {
        case 1:
          docResult.save(`${new Date().toISOString()}_perfil.pdf`);
          break;
        case 2:
          docResult.save(`${new Date().toISOString()}_credencial.pdf`);
          break;
        default:
          break;
      }
    });
  }


  openaAlert(texto, tipo): Observable<any> {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '350px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration:'150ms',
      data: {texto: texto, tipo: tipo},
    });

    return dialogRef.afterClosed();
  }


}
