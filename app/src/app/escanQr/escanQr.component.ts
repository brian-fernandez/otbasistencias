
import { Component, ViewChild, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Keysecret } from 'src/app/config/secretKeys';
import { UtilsService } from 'src/app/services/Utils.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-escanQr',
  templateUrl: './escanQr.component.html',
  styleUrls: ['./escanQr.component.css']
})
export class EscanQrComponent implements OnInit {
  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;
  result:any;
  private Key = Keysecret.key;
  userData: any;
  bono: string;
  constructor(
    private encript: EncrDecrService,
    private utils:UtilsService,
    private userService:UserService

  ) {}

  ngOnInit() {
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
            if (!dev.label.includes('back')) {
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

  handleQRCode(event: any) {
    const qrCode = event.target.value;

    // Realiza acciones con el código QR leído
  }
  add(){
    this.result = false;
  }
}
