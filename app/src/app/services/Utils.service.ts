import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  user: any;
  base64String: string;

constructor(
private _snackBar:MatSnackBar,
private http:HttpClient
) { }
  openSnackBar(text:any) {
    this._snackBar.open(text, 'Cerrar', {
      horizontalPosition: "start",
      verticalPosition: "bottom",
      duration:2000
    });
  }

  credentials(){
    const miObjetoRecuperado = localStorage.getItem('data');
    let objetoRecuperado: any = null;
    
    if (miObjetoRecuperado !== null) {
      objetoRecuperado = JSON.parse(miObjetoRecuperado);
    }
    return this.user= objetoRecuperado;
   
  
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
}
