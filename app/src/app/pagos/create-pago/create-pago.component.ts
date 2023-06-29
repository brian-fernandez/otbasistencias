import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable, interval, map, startWith, take } from 'rxjs';
import { UtilsService } from 'src/app/services/Utils.service';


import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";


export interface user {
  nombre: string;
  cargo: string;
  CI: string;
}

interface Food {
  value: string;
  viewValue: string;
}
export interface State {
  id: number;
  img: string;
  name: string;
  ci: string;
}

export interface Pago {
  id: number;
  descripcion: string;
  fecha: string,
  monto: number,
  seleccionado?: any
}
@Component({
  selector: 'app-create-pago',
  templateUrl: './create-pago.component.html',
  styleUrls: ['./create-pago.component.css']
})
export class CreatePagoComponent implements OnInit {
  maxDate = new Date();
  stateCtrl = new FormControl('');
  states: State[] = [
    {
      id: 1,
      name: 'Brian Fernandez Mercado',
      ci: '45676243',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      img: '../../assets/img/avatar.jpg',
    },
    {
      id: 2,
      name: 'Anabel Antonia salvatierra',
      ci: '45645376',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      img: '../../assets/img/avatar.jpg',
    },
    {
      id: 3,
      name: 'Anabel Anguz mme',
      ci: '55436243',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      img: '../../assets/img/avatar.jpg',
    },
    {
      id: 4,
      name: 'Rene Alejandro Martinez',
      ci: '25436223',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      img: '../../assets/img/avatar.jpg',
    },
  ];


  pagosPendientes: Pago[] = [
    { id: 1, descripcion: 'Pago 1', fecha: "26-06-2023", monto: 30 },
    { id: 2, descripcion: 'Pago 2', fecha: "26-06-2023", monto: 10 },
    { id: 3, descripcion: 'Pago 3', fecha: "26-06-2023", monto: 10 },
    { id: 4, descripcion: 'Pago 1', fecha: "26-06-2023", monto: 10 },
    { id: 5, descripcion: 'Pago 2', fecha: "26-06-2023", monto: 10 },
    { id: 6, descripcion: 'Pago 3', fecha: "26-06-2023", monto: 10 },
    { id: 7, descripcion: 'Pago 1', fecha: "26-06-2023", monto: 30 },
    { id: 8, descripcion: 'Pago 2', fecha: "26-06-2023", monto: 10 },
    { id: 9, descripcion: 'Pago 3', fecha: "26-06-2023", monto: 10 },
    { id: 10, descripcion: 'Pago 1', fecha: "26-06-2023", monto: 30 },
    { id: 11, descripcion: 'Pago 2', fecha: "26-06-2023", monto: 10 },
    { id: 12, descripcion: 'Pago 3', fecha: "26-06-2023", monto: 10 },
    { id: 13, descripcion: 'Pago 1', fecha: "26-06-2023", monto: 30 },
    { id: 14, descripcion: 'Pago 2', fecha: "26-06-2023", monto: 10 },
    { id: 15, descripcion: 'Pago 3', fecha: "26-06-2023", monto: 10 },

    // Agrega más pagos pendientes si es necesario
  ];

  montoTotal: number = 0;
  select: any;
  filteredStates!: Observable<State[]>;
  user: any;
  selectedTime: "";
  dataenviar: any;
  progress: number;
  active: any;
  constructor(private utils: UtilsService) {
    this.maxDate.setDate(this.maxDate.getDate());
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  ngOnInit() {
    this.active = false;
    this.progress = 0;
    this.user = this.utils.credentials();

    for (const pago of this.pagosPendientes) {
      pago.seleccionado = false;
    }
  }
  onOptionSelected(data: any) {

  }

  time: "";
  pagosSeleccionados: Pago[] = [];

  toggleSeleccion(pago: Pago): void {
    pago.seleccionado = !pago.seleccionado;

    if (pago.seleccionado) {
      this.pagosSeleccionados.push(pago);
    } else {
      const index = this.pagosSeleccionados.indexOf(pago);
      if (index !== -1) {
        this.pagosSeleccionados.splice(index, 1);
      }
    }
    console.log(this.pagosSeleccionados);
    this.calcularMontoTotal();
  }

  calcularMontoTotal(): void {
    this.montoTotal = this.pagosSeleccionados.reduce((total, pago) => total + pago.monto, 0);
  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }
  send(data: any) {
    this.select = data;
  }

  removed() {
    this.time = "";
    this.selectedTime = "";
    delete this.select;
    this.stateCtrl.reset();
    this.montoTotal = 0;
    this.dataenviar = false;
    this.pagosSeleccionados = [];
    for (const pago of this.pagosPendientes) {
      pago.seleccionado = false;
    }
    console.log(this.dataenviar);

  }

  newPago(): any {
    console.log(this.time +'   '+ this.selectedTime);
    
    if (this.time === undefined || this.selectedTime === undefined) {
      this.utils.openSnackBar('Ingrese el tiempo limite');
     
    } else {
      this.dataenviar = {

        user: this.select,
        total: this.montoTotal,
        fechalimite: moment(this.time).format('MM-DD-YYYY'),
        horalimite: this.selectedTime,
        fecha: moment(new Date()).format('MM-DD-YYYY'),
        data: this.pagosSeleccionados

      }
      console.log(this.dataenviar);
    }



  }






  download() {
    this.active = true;
    this.progress = -1;
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        const DATA: any = document.getElementById('htmlData');
        const doc = new jsPDF('portrait', 'px', 'Letter');
        const options = {
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
          return doc;
        }).then((docResult) => {
          docResult.save(`${new Date().toISOString()}_Pago.pdf`);
        });
        clearInterval(interval);
        this.active = false;
      }
    }, 100);




  }



}