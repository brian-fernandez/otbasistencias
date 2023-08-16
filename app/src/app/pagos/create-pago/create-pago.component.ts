import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable, interval, map, startWith, take } from 'rxjs';
import { UtilsService } from 'src/app/services/Utils.service';


import { jsPDF } from "jspdf";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


import html2canvas from "html2canvas";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface State {
  id: number
  nombre: string
  src_foto: string
  ci: string
  apellido: string
  celular: string
  telefono?: string
  email: string
  n_domicilio: string
  calle: string
}
interface Food {
  value: string;
  viewValue: string;
}


export interface Pago {
  id: any;
  descripcion: any;
  fecha: any,
  monto: any,
  seleccionado?: any
}

export interface Pago2 {
  id: number;
  asunto: string;
  categoria: string;
  seleccionado?: any;

}
@Component({
  selector: 'app-create-pago',
  templateUrl: './create-pago.component.html',
  styleUrls: ['./create-pago.component.css']
})
export class CreatePagoComponent implements OnInit {
  maxDate = new Date();
  stateCtrl = new FormControl('');





  montoTotal: any = 0;
  select: any;
  filteredStates!: Observable<State[]>;
  user: any;
  selectedTime: "";
  dataenviar: any;
  progress: number;
  active: any;
  states: State | any;
  listasMultas: any;
  pagosPendientes: any;
  multasseleccionadas: Pago2[] = [];
  verify: boolean;
  dataPago: any;
  foto: any;
  userId: any;
  constructor(private utils: UtilsService, private userService: UserService, private router: Router,private http:HttpClient) {
    this.maxDate.setDate(this.maxDate.getDate());

  }

  ngOnInit() {
    this.verify = true;
    this.listAfiliado();
    this.active = false;
    this.progress = 0;
    this.user = this.utils.credentials();
    this.http.get('./../../../assets/icons/logo.png', { responseType: 'blob' })
    .subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.foto = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
    this.idreponsable();
  }
  listAfiliado() {
    this.userService.getAfiliadoPagos().subscribe(
      async (params: any) => {
        this.states = params;
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => (state ? this._filterStates(state) : this.states.slice())),
        );
      }, (error) => {


      }
    )
  }

  onOptionSelected(data: any) {

  }


  time: "";
  pagosSeleccionados: Pago[] = [];
  toggleSeleccion(pago): void {
    pago.seleccionado = !pago.seleccionado;

    if (pago.seleccionado) {
      this.pagosSeleccionados.push(pago);

      this.multasseleccionadas?.push(pago.id);

    } else {
      const index = this.pagosSeleccionados.indexOf(pago);
      if (index !== -1) {
        this.pagosSeleccionados.splice(index, 1);
        this.multasseleccionadas?.splice(index, 1);
      }
    }


    this.calcularMontoTotal();
  }

  calcularMontoTotal(): void {
    this.montoTotal = this.pagosSeleccionados.reduce((total, pago) => total + parseFloat(pago.monto), 0).toFixed(2);
    if (this.montoTotal === "0.00") {
      this.montoTotal = false;
    }


  }
  private _filterStates(value: string): State[] {
    const filterValue = value?.toLowerCase();


    return this.states.filter(state => {
      const nombre = state.nombre?.toLowerCase();
      const apellido = state.apellido?.toLowerCase();
      const carnet = state.ci?.toLowerCase();

      return nombre?.includes(filterValue) || apellido?.includes(filterValue) || carnet?.includes(filterValue);
    });
  }









  send(data: any) {
    this.select = data;

    this.userService.getMultasUserid(this.select.id).subscribe(
      async (params: any) => {
        const multas = params.multas;
        this.listasMultas = multas.filter(multa => multa.cancelado === 0);

        for (const pago of this.listasMultas) {
          pago.seleccionado = false;
        }
      }
    )
  }
  showEvent(id) {
    this.router.navigate(['home/evento/', id]);
  }
  removed() {
    this.verify = true;
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


  }

idreponsable(){
  this.userService.get().subscribe(
    async (params:any) => {
        this.userId = params;
    }
  )
}

  newPago(): any {

    this.dataenviar = {
      id_responsable: this.userId.id,
      total_pago: this.montoTotal,
      multas_pagadas: this.multasseleccionadas
    }

    this.utils.openaAlert('¿Seguro que deseas guardar los cambios?', 'alerta').subscribe(
      async (params: any) => {
        if (params) {
          this.userService.newPagos(this.dataenviar).subscribe(
            async (params: any) => {

              this.userService.getpagoid(params.id).subscribe(
                async (params: any) => {
                  this.dataPago = params;
                 this.showPdf(this.dataPago);
                  this.router.navigate(['home/pagos']);
                }, erro => {
                  this.utils.openSnackBar('Error de conexion');
                }
              )
              this.verify = false;
            }, err => {
              this.utils.openSnackBar('Error de conexion');
            }
          )
        }
      }
    )
  }

  // download() {
  //   this.active = true;
  //   this.progress = -1;
  //   const interval = setInterval(() => {
  //     this.progress += 10;
  //     if (this.progress >= 100) {
  //       const DATA: any = document.getElementById('htmlData');
  //       const doc = new jsPDF('portrait', 'px', 'Letter');
  //       const options = {
  //         background: 'white',
  //         scale: 3
  //       };
  //       html2canvas(DATA, options).then((canvas) => {
  //         const img = canvas.toDataURL('image/PNG');
  //         const bufferX = 15;
  //         const bufferY = 15;
  //         const imgProps = (doc as any).getImageProperties(img);
  //         const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //         doc.addImage(
  //           img,
  //           'PNG',
  //           bufferX,
  //           bufferY,
  //           pdfWidth,
  //           pdfHeight,
  //           'FAST'
  //         );
  //         return doc;
  //       }).then((docResult) => {
  //         docResult.save(`${new Date().toISOString()}_Pago.pdf`);
  //       });
  //       clearInterval(interval);
  //       this.active = false;
  //     }
  //   }, 100);




  // }
 showPdf(data) {



    let documentDefinition:any;


    if(this.foto) {

     documentDefinition = {



      pageSize: 'A4',
      content: [
        { text: 'Pago', style: 'header',alignment: 'center' },
        {
          alignment: 'right',
          stack: [
            { image: this.foto,width: 30, height: 30 },
            { text: 'OTB Barrio Universitario Alto\nAvenida Petrolera Km 3 1/2\nCochabamba - Bolivia' }
          ],
        },
        {
          alignment: 'left',
          stack: [
            // { image: 'data:image/png;base64,iVBORw0KG... (tu imagen en base64)', width: 80, height: 80 },
            { text: `Fecha: ${data.pago.fecha}\nSeñor(es): ${data.multas[0].nombre} ${data.multas[0].apellido}\nC.I: ${data.multas[0].ci}`,margin: [ 0, 0, 10, 20 ] }
          ],

        },
        {
          table: {
            widths: ['auto', '*', 'auto'],
            body: [
              ['id', 'Detalle', 'total'],
              ...data.multas[0].multas.map(multa => [multa.id, `${multa.evento.titulo} - ${multa.evento.fecha}`, multa.monto]),
            ],
          },
        },
        { text: `Total en Bs.: ${data.pago.total}`, style: 'total' },
        {
          columns: [
            { qr: data.pago.codigo, fit: 100, margin: [0, 5] },
            {
              stack: [
                { text: `Código: ${data.pago.codigo}` },
                { text: `Responsable: ${data.pago.responsable_id.nombre} ${data.pago.responsable_id.apellido}` },
              ],
              width: 400,
            },
          ],
        },
      ],

      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] },
        total: { fontSize: 14, bold: true, margin: [0, 10, 0, 10] },
      },
    };
    }
    // const printer = new pdfMake();
    // const pdfDoc = printer.createPdfKitDocument(documentDefinition);
    // pdfDoc.pipe(fs.createWriteStream('ruta-al-archivo.pdf'));
    // pdfDoc.end();
    const pdf = pdfMake.createPdf(documentDefinition);
    pdf.open();
  }


}
