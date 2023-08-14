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

    this.myAngularxQrCode = this.encript.set(this.Key,"1");
  }

  ionViewDidEnter() {


  }
  convertirNumeroEnLetras(numero: string): string {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['', 'once', 'doce', 'trece', 'catorce', 'quince'];
    const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

    // Dividir la entrada en parte entera y centavos
    const partes = numero.split('.');
    const parteEntera = parseInt(partes[0], 10);

    if (isNaN(parteEntera)) {
      return 'Entrada inválida';
    }

    let parteEnteraEnLetras = this.convertirParteEnteraEnLetras(parteEntera, unidades, especiales, decenas);
    let centavosEnLetras = '';

    if (partes[1]) {
      const centavos = parseInt(partes[1], 10);
      if (!isNaN(centavos) && centavos > 0) {
        centavosEnLetras = this.convertirCentavosEnLetras(centavos, unidades, especiales, decenas);
      }
    }

    if (centavosEnLetras) {
      parteEnteraEnLetras += ' con ' + centavosEnLetras;
    }


    return parteEnteraEnLetras;
  }

  convertirParteEnteraEnLetras(numero: number, unidades: string[], especiales: string[], decenas: string[]): string {
    if (numero === 0) {
      return 'cero';
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

  convertirCentavosEnLetras(numero: number, unidades: string[], especiales: string[], decenas: string[]): string {
    if (numero === 0) {
      return 'cero';
    } else if (numero <= 9) {
      return unidades[numero] + ' centavos';
    } else if (numero <= 15) {
      return especiales[numero - 10] + ' centavos';
    } else if (numero % 10 === 0) {
      return decenas[Math.floor(numero / 10)] + ' centavos';
    } else {
      return decenas[Math.floor(numero / 10)] + ' y ' + unidades[numero % 10] + ' centavos';
    }
  }


}
