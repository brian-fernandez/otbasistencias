import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Keysecret } from 'src/app/config/secretKeys';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

export interface UserData {
  id:string;
  nombreCompleto:string;
  ci:string;
  cargo:string;
  foto: string;
  donacion:any;
}

@Component({
  selector: 'app-event-qr',
  templateUrl: './event-qr.component.html',
  styleUrls: ['./event-qr.component.css']
})
export class EventQrComponent implements OnInit {
  private Key = Keysecret.key;
  result: boolean;
  constructor(
    private encript : EncrDecrService,
    private dialog:MatDialog
  ) { }

  data = [
    {
        id:"1",
        nombre:"Brian Fernandez Mercado",
        ci:"123456789",
        foto:"",
        
    },
    {
      id:"2",
      nombre:"Alejandro Antornio Hernandez",
      ci:"123456789",
      foto:"",
      
  }
  ]

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
 
  ngOnInit() {
     
  }

  ngAfterViewInit():void{
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
  });

  this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      const resultt = this.encript.get(this.Key,result)
      for (let index = 0; index < this.data.length; index++) {
        if (resultt == this.data[index].id) {
          console.log('encontrado');
          this.result = true;
        }
        
      }
  });
  }
  
  removed(){
    // this.qrScannerComponent.startScanning();
    this.result = false;
  }
  add(){
    this.dialog.closeAll();
  }
}
