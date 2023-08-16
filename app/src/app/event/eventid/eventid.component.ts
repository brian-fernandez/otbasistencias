import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EventQrComponent } from '../event-qr/event-qr.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SearchUserComponent } from '../searchUser/searchUser.component';
import { HttpClient } from '@angular/common/http';

const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const moments = require('moment');
require('moment-timezone');
export interface UserData {
  id: number
  fecha: string
  hora: string
  estado: number
  id_user: number
  id_evento: number
  idbono: any
  created_at: string
  updated_at: string
  deleted_at: any
  usuario: Usuario
  bono: any,
  descripcion: any
}

export interface Usuario {
  id: number
  nombre: string
  apellido: string
}



@Component({
  selector: 'app-eventid',
  templateUrl: './eventid.component.html',
  styleUrls: ['./eventid.component.css']
})
export class EventidComponent implements OnInit {
  active: boolean;
  progress: number;
  displayedColumns: string[] = ['foto', 'nombrecompleto','Carnet', 'hora_de_registro', 'estado', 'donacion'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  timestart: string = "18:33";
  timeendt: string = "18:40";
  percentage: number = 0;
  dataEvent: any;
  dataAsunto: any;
  dataAsistencia: any;
  id: any;
  descrip: any;
  logo: string;

  constructor(private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private http:HttpClient
  ) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getEvento(this.id);
    });
    this.http.get('https://i.ibb.co/Lr9dq7K/Frame-1-2.png', { responseType: 'blob' })
    .subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.logo = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
  }

  getEvento(id) {
    this.userService.getEventoAsistencia(id).subscribe(
      async (params: any) => {
        this.dataEvent = params;
        this.descrip = params.descripcion;
        console.log(this.dataEvent);

        this.timestart = this.dataEvent.hora_inicio;
        this.timeendt = this.dataEvent.hora_fin;
        if (this.dataEvent.estado === 0) {
          this.updateProgress();
        }
        if (this.dataEvent.estado === 1) {
          this.percentage = 0;
        }
        if (this.dataEvent.estado === 2) {
          this.percentage = 100;
        }






        this.dataAsunto = params.asuntos;


        this.dataAsistencia = params.asistencias;


        this.dataSource = new MatTableDataSource(this.dataAsistencia);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }



  parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);
    return date;
  }

  updateProgress() {

    const currentTimeBolivia = moments().tz('America/La_Paz');


    const eventDateBolivia = moments(this.dataEvent.fecha + ' ' + this.dataEvent.hora_inicio, 'YYYY-MM-DD HH:mm:ss').tz('America/La_Paz');
    const eventEndDateBolivia = moments(this.dataEvent.fecha + ' ' + this.dataEvent.hora_fin, 'YYYY-MM-DD HH:mm:ss').tz('America/La_Paz');


    if (currentTimeBolivia.isSame(eventDateBolivia, 'day')) {
      const elapsedMilliseconds = currentTimeBolivia.diff(eventDateBolivia);
      const totalMilliseconds = eventEndDateBolivia.diff(eventDateBolivia);
      this.percentage = (elapsedMilliseconds / totalMilliseconds) * 100;
      this.percentage = Math.min(this.percentage, 100);

      if (this.percentage < 100) {
        setTimeout(() => this.updateProgress(), 1000);
      } else {
        this.getEvento(this.id);
      }
    } else {

      this.percentage = 0;
    }
  }


  ngOnDestroy(): void {
    this.percentage = 100
  }

  back() {

  }
  download() {
    this.active = true;
    this.progress = -1;
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {

        clearInterval(interval);
        this.active = false;
      }
    }, 100);
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    // Custom filtering based on name and surname
    this.dataSource.filterPredicate = (data: UserData, filter: string) => {
      const nameMatches = data.usuario.nombre.toLowerCase().includes(filter);
      const surnameMatches = data.usuario.apellido.toLowerCase().includes(filter);
      return nameMatches || surnameMatches;
    };
  }


  viewprofile(id) {
    this.router.navigate(['home/perfil/', id]);
  }




  openDialog() {

    const dialogRef = this.dialog.open(EventQrComponent, {
      width: '90%',
      height: '500px',
      data: { idAsunto: this.id, },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


        this.getEvento(this.id);
      }
    });


  }


  searchUser() {
    const dialogRef = this.dialog.open(SearchUserComponent, {
      width: '90%',
      height: '500px',
      data: { idAsunto: this.id, },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


        this.getEvento(this.id);
      }
    });

  }


  pdf() {

    let eventoData = this.dataEvent;
    console.log(eventoData);


    const asistenciaRows = eventoData.asistencias.map((asistencia, index) => {
      let estadoText = asistencia.estado === 0 ? 'No asistio' : 'Asistio';
      let fechaText = asistencia.estado === 0 ? '-' : asistencia.fecha;

      return [
        { text: (index + 1).toString(), style: 'tableCell' }, // Columna de contador
        { text: `${asistencia.usuario.nombre} ${asistencia.usuario.apellido}`, style: 'tableCell' },
        { text: `${asistencia.usuario.ci}`, style: 'tableCell' },
        { text: estadoText, style: 'tableCell' },
        { text: fechaText, style: 'tableCell' }
      ];
    });
    const tableLayout = {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 0 : 1;
      },
      vLineWidth: function (i) {
        return 0;
      },
      hLineColor: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 'white' : 'gray';
      },
      paddingLeft: function(i) { return 5; },
      paddingRight: function(i) { return 5; },
      paddingTop: function(i) { return 2; },
      paddingBottom: function(i) { return 2; }
    };
    const tableHeaders = [
      { text: '#', style: 'tableHeader' },
      { text: 'Nombre completo', style: 'tableHeader' },
      { text: 'C.I', style: 'tableHeader' },
      { text: 'Estado', style: 'tableHeader' },

      { text: 'Fecha', style: 'tableHeader' }
    ];

    const tableBody = asistenciaRows;

    const tableContent = [tableHeaders, ...tableBody];



    let documentDefinition:any;

     documentDefinition = {
      content: [
        {
          alignment: 'right',
          stack: [
            { image: this.logo,width: 30, height: 30 },
            { text: 'OTB Barrio Universitario Alto\nAvenida Petrolera Km 3 1/2\nCochabamba - Bolivia' }
          ],
        },
        { text: 'Detalles del Evento', style: 'header', alignment: 'center' },
        { text: `Nombre: ${eventoData.nombre}` },
        { text: `Fecha: ${eventoData.fecha} : ${eventoData.hora_inicio} - ${eventoData.hora_fin} ` },
        { text: `Lugar: ${eventoData.lugar}` },
        { text: 'Descripción:', style: 'subheader' },
        { text: eventoData.descripcion },
        { text: 'Lista de asistencia:', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            widths: ['auto', 'auto', 'auto','*', '*'], // Anchos de las columnas
            headerRows: 1,
            body: tableContent,
            layout: tableLayout
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        },
        tableCell: {
          fontSize: 10,
          color: 'black'
        }
      }
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.open();
  }
}
