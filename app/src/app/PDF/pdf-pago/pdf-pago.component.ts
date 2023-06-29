import { Component, Input, OnInit } from '@angular/core';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
import { Keysecret } from "./../../config/secretKeys";
@Component({
  selector: 'app-pdf-pago',
  templateUrl: './pdf-pago.component.html',
  styleUrls: ['./pdf-pago.component.css']
})
export class PdfPagoComponent implements OnInit {

  @Input() texto: any;

  
  myAngularxQrCode: string;

  private Key = Keysecret.key;
  constructor(
    private encript:EncrDecrService
  ) { }

  ngOnInit() {
    console.log(this.texto);
    this.myAngularxQrCode = this.encript.set(this.Key,"1");
  }

  ionViewDidEnter() {
    console.log(this.texto);
    
  }

   convertirNumeroEnLetras(numero: number): string {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['', 'once', 'doce', 'trece', 'catorce', 'quince'];
    const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    
    if (numero === 0) {
      return 'cero';
    } else if (numero < 0 || numero >= 100) {
      return 'Número fuera de rango';
    } else if (numero <= 9) {
      return unidades[numero];
    } else if (numero <= 15) {
      return especiales[numero - 10];
    } else if (numero % 10 === 0) {
      return decenas[Math.floor(numero / 10)];
    } else {
      return decenas[Math.floor(numero / 10)] + ' y ' + unidades[numero % 10];
    }
  }

}
