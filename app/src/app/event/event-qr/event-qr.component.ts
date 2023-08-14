import { Component, ViewChild, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Keysecret } from 'src/app/config/secretKeys';
import { UtilsService } from 'src/app/services/Utils.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { UserService } from 'src/app/services/user.service';
import { SearchUserComponent } from '../searchUser/searchUser.component';

export interface UserData {
  id: string;
  nombreCompleto: string;
  ci: string;
  cargo: string;
  foto: string;
  donacion: any;
}
export interface DialogData {
  idAsunto:any
}

@Component({
  selector: 'app-event-qr',
  templateUrl: './event-qr.component.html',
  styleUrls: ['./event-qr.component.css']
})
export class EventQrComponent implements OnInit {
  private Key = Keysecret.key;
  result: boolean;
  userData: any;
  bono: string;
  constructor(
    private encript: EncrDecrService,
    public dialogRef: MatDialogRef<SearchUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private utils:UtilsService,
    private userService:UserService

  ) {

   }



  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;
  ngOnInit() {
    this.bono = "";
    this.result = false;
   }
  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {

      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        if (this.isMobileDevice()) {
          for (const dev of videoDevices) {
            if (!dev.label.includes('front')) {
              choosenDev = dev;
              break;
            }
          }
        } else {
          choosenDev = videoDevices[0];
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        }
      }
    });
    this.qrScannerComponent.capturedQr.subscribe(result => {

      const resultt = this.encript.get(this.Key, result);
      this.userService.getId(resultt).subscribe(
        async (params: any) => {
          this.result = true;
          this.userData = params.user;

        }
      );
    });
  }



  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
  }


  add(){
    this.result = false;
    this.userService.registrarAsistencia(this.data.idAsunto,this.userData.id,this.bono).subscribe(
     async (params:any) => {
       this.dialogRef.close(true);
     },err =>{
       if (err.error.error === "El usuario ya está registrado en esta asistencia") {
         this.utils.openSnackBar('El usuario ya está registrado en esta asistencia');
       }else{
         this.utils.openSnackBar('Error de conexión');
       }
     }
    )
 }

 removed(){
   this.result = false;
 }
}
