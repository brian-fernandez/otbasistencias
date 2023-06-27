import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escanQr',
  templateUrl: './escanQr.component.html',
  styleUrls: ['./escanQr.component.css']
})
export class EscanQrComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  handleQRCode(event: any) {
    const qrCode = event.target.value;
    console.log('Código QR leído:', qrCode);
    // Realiza acciones con el código QR leído
  }
}
