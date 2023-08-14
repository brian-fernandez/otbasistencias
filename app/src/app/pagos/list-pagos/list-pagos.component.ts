import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/Utils.service';
import { UserService } from 'src/app/services/user.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
export interface UserData {
  id: number
  fecha: string
  total: string
  codigo: string
  responsable: Responsable
  usuarios_con_multas: UsuariosConMulta[]
}

export interface Responsable {
  id: number
  nombre: string
  apellido: string
  ci: string
}

export interface UsuariosConMulta {
  id: number
  nombre: string
  apellido: string
  ci: string
}


const DATA = [
  {
    "id": "2",
    "nombre": "Juan Antonio Mercado",
    "ci": "1249534863",
    "fecha": "2023-06-20",
    "fechalimite": "2023-06-19",
    "encargado": "Antonio  Alvarez",
    "estado": 2
  },
  {
    "id": "1",
    "nombre": "Brian Fernandez Mercado",
    "ci": "1249534863",
    "fecha": "2023-06-18",
    "fechalimite": "2023-06-19",
    "encargado": "Antonio Alvarez",
    "estado": 2
  },
  {
    "id": "1",
    "nombre": "Brian Fernandez Mercado",
    "ci": "1249534863",
    "fecha": "2023-06-18",
    "fechalimite": "2023-06-19",
    "encargado": "Antonio Alvarez",
    "estado": 1
  }
]
@Component({
  selector: 'app-list-pagos',
  templateUrl: './list-pagos.component.html',
  styleUrls: ['./list-pagos.component.css']
})
export class ListPagosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'fecha','evento',  'encargado',  'acciones'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;
  info: any;
  listPagos: any;
  foto: string;
  constructor(
    private utils:UtilsService,
    private router:Router,
    private UserService:UserService,
    private Utils:UtilsService,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.getPagos();
    this.http.get('./../../../assets/icons/logo.png', { responseType: 'blob' })
    .subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.foto = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
  }


  getPagos(){
    this.UserService.getPagos().subscribe(
      async (params:any) => {
        this.listPagos = params;
        this.dataSource = new MatTableDataSource(this.listPagos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      }, (err) =>{
        this.Utils.openSnackBar('Error de conexión');
      }
    )
  }


  showprofile(id){
    this.router.navigate(['home/perfil/',id]);
  }
  addnew() {
    this.router.navigateByUrl('home/nuevo-pago');
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.filterPredicate = (data: UserData, filter: string) => {
      const nameMatches = data.usuarios_con_multas['nombre'].toLowerCase().includes(filter);
      const surnameMatches = data.usuarios_con_multas['apellido'].toLowerCase().includes(filter);
      return nameMatches || surnameMatches ;
    };
  }

  estados(timeone: any, timetimelimit: any, estado: any): any {
    if (moment(timeone).isAfter(timetimelimit)) {
      return "Tiempo caducado";
    } else if (estado === 1) {
      return "Verificado";
    } else {
      return "Sin verificar";
    }

  }

  veri(timeone: any, timetimelimit: any, estado: any):any {
    if (moment(timeone).isAfter(timetimelimit)) {
      return false;
    } else if (estado === 1) {
      return false;
    } else if (estado === 2) {
      return true;
    }

  }






showpago(data){

  let documentDefinition:any;
  this.UserService.getpagoid(data).subscribe(
    async (params:any) => {
        this.data = params;
    
       if (this.data) {
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
                 { text: `Fecha: ${this.data?.pago?.fecha}\nSeñor(es): ${this.data.multas[0]?.nombre} ${this.data.multas[0]?.apellido}\nC.I: ${this.data.multas[0]?.ci}`,margin: [ 0, 0, 10, 20 ] }
               ],

             },
             {
               table: {
                 widths: ['auto', '*', 'auto'],
                 body: [
                   ['id', 'Detalle', 'total'],
                   ...this.data.multas[0].multas.map(multa => [multa.id, `${multa.evento.titulo} - ${multa.evento.fecha}`, multa.monto]),
                 ],
               },
             },
             { text: `Total en Bs.: ${this.data.pago.total}`, style: 'total' },
             {
               columns: [
                 { qr: this.data.pago.codigo, fit: 100, margin: [0, 5] },
                 {
                   stack: [
                     { text: `Código: ${this.data.pago.codigo}` },
                     { text: `Responsable: ${this.data.pago.responsable_id.nombre} ${this.data.pago.responsable_id.apellido}` },
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

         const pdf = pdfMake.createPdf(documentDefinition);
         pdf.open();
       }
    } , error =>[
      this.utils.openSnackBar('Error de conexión')
    ]
  )




  }
}

