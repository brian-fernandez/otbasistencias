import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { UserService } from '../services/user.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  single: any[];
  view: any = [300, 300];
  viewtwo: any = [900, 300];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  tooltipTemplate: boolean = false;
  timeline: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  data1: any;
  // colorScheme = {
  //   domain: ['#3f51b5', '#e82828']
  // };

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'Eventos';

  animations: boolean = true;

  xAxisLabel2: string = 'Meses';
  yAxisLabel2: string = 'Cantidad';



  yScaleMax = 1000;
  yScaleMin = 0;

  // colorSchemetwo = {
  //   domain: ['#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5']
  // };
  multi: any;

  colorScheme: Color = {
    domain: ['#99CCE5', '#FF7F7F'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };
  data2: any;
  data3: any;
  year: string;
  data4: any;
  year2: string;
  info: number;

  displayedColumns: string[] = ['id', 'nombre', 'carnet', 'tipo', 'estado', 'calle'];
  displayedColumnsEvent: string[] = ['id', 'nombre', 'carnet', 'tipo', 'estado'];
  dataSourceuser: any;
  dataUser: any;
  foto: string;
  dataEvent: any;
  dataEvento: any;
  selectedValue: number;
  constructor(
    private UserService: UserService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.selectedValue = 0;
    this.year = "2023";
    this.year2 = "2023";
    this.getUsersG();
    this.getUserActiveG();
    this.getEventosPorMes(this.year);
    this.getBonosPorMes(this.year2)
    this.info = 0;
    this.http.get('./../../../assets/icons/logo.png', { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.foto = reader.result as string;
        };
        reader.readAsDataURL(blob);
      });
    this.dataUser = {
      tipo: "",
      estado: "",
      calle: "",
    }
    this.dataEvent = {
      monto_recaudado_min: "",
      monto_recaudado_max: "",
      fecha_inicio: "",
      fecha_final: ""
    }

  }
  onResize(event: any) {
    this.view = [event?.target.innerWidth / 2.5, 400];
  }



  getUsersG() {

    this.UserService.getUsersReportsG().subscribe(
      async (params: any) => {
        this.data1 = params;


      }
    )
  }
  getUserActiveG() {

    this.UserService.getActiveUsersChartData().subscribe(
      async (params: any) => {
        this.data2 = params;


      }
    )
  }
  getEventosPorMes(year) {

    this.UserService.getEventosPorMes(year).subscribe(
      async (params: any) => {
        this.data3 = params;


      }
    )
  }
  getBonosPorMes(year) {

    this.UserService.getBonosPorMes(year).subscribe(
      async (params: any) => {
        this.data4 = params[0].series;


      }
    )
  }

  show(event) {
    this.getEventosPorMes(event);

  }

  show2(event) {
    this.getBonosPorMes(event);

  }


  formatYAxisTicks(value) {
    // Redondear el valor a 2 decimales
    const roundedValue = parseFloat(value).toFixed(2);

    // Formatear el valor para mostrarlo con un separador de miles (opcional)
    const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedValue;
  }



  //reportes
  //reportes 1
  cons(data) {
    this.info = data;

    if (data == 1) {
      this.getUsersByFilters(data);
    }
    if (data == 2) {
      this.getEventsWithAttendances(data);
    }
  }



  selecttipo(event) {
    this.dataUser.tipo = event.value;
    this.getUsersByFilters(this.dataUser);
  }
  selectestado(event) {
    if (event.value === 'Activo') {
      this.dataUser.estado = "1";
    }
    if (event.value === 'No activo') {
      this.dataUser.estado = "0";
    }
    if (event.value === 'all') {
      this.dataUser.estado = "";
    }


    this.getUsersByFilters(this.dataUser);
  }

  selectcalle(event) {

    this.dataUser.calle = event.value;
    this.getUsersByFilters(this.dataUser);
  }
  getUsersByFilters(data) {

    this.UserService.getUsersByFilters(data).subscribe(
      async (params: any) => {
        this.dataSourceuser = params;
      }
    )
  }

  pdfUser() {
    const tiempo = moment(new Date()).format('YYYY-MM-DD');

    const header = { text: 'Lista de usuarios', style: 'header', alignment: 'center' };
    const address = { image: this.foto, width: 30, height: 30 };
    const addressText = { text: 'OTB Barrio Universitario Alto\nAvenida Petrolera Km 3 1/2\nCochabamba - Bolivia' };
    const dateText = { text: `Fecha: ${tiempo}\n`, margin: [0, 0, 10, 20] };

    const tableHeader = ['ID', 'Nombre Completo', 'Carnet', 'Estado', 'Tipo', 'Calle'];
    const tableData = this.dataSourceuser.map(usuario => [
      usuario.id,
      `${usuario.nombre} - ${usuario.apellido}`,
      usuario.ci,
      usuario.estado ? 'Activo' : 'No Activo',
      usuario.type,
      usuario.calle
    ]);

    const table = {
      table: {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
        headerRows: 1,
        body: [tableHeader, ...tableData]
      }
    };

    const content = [header, { alignment: 'right', stack: [address, addressText] }, { alignment: 'left', stack: [dateText] }, table];

    let documentDefinition;

    documentDefinition = {
      pageSize: 'A4',
      content: content,
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] }
      }
    };

    const pdf = pdfMake.createPdf(documentDefinition);
    pdf.open();
  }


  //reporte 2

  getEventsWithAttendances(data) {

    if (!this.dataEvent.fecha_inicio && !this.dataEvent.fecha_final) {
      delete this.dataEvent.fecha_inicio;
      delete this.dataEvent.fecha_final;
    }
    if (this.dataEvent.estado === "all") {
       delete this.dataEvent.estado;
    }
    if (this.dataEvent.monto_recaudado_min === "0" || this.dataEvent.monto_recaudado_min === "") {
      delete this.dataEvent.monto_recaudado_min;
    }
    this.UserService.getEventsWithAttendance(data).subscribe(
      async (params: any) => {
        this.dataEvento = params;
      }
    )
  }


  fechas(input, event) {
    if (input === 'entrada') {
      this.dataEvent.fecha_inicio = event.value;
    }
    if (input === 'salida') {
      this.dataEvent.fecha_final = event.value;
    }


    if (this.dataEvent.fecha_inicio && this.dataEvent.fecha_final) {
      this.getEventsWithAttendances(this.dataEvent);
    }
  }

  monto(evento: Event) {
    const rangeValue = (event.target as HTMLInputElement).value;

    this.selectedValue = parseInt(rangeValue, 10);
    this.dataEvent.monto_recaudado_min = (event.target as HTMLInputElement).value;

    this.getEventsWithAttendances(this.dataEvent);


  }

  selectestadoEvent(event) {

    if (event.value === 'Pendiente') {
      this.dataEvent.estado = "1";

    }
    if (event.value === 'Finalizado') {
      this.dataEvent.estado = "2";

    }
    if (event.value === 'all') {
      this.dataEvent.estado = "all";
    }
    this.getEventsWithAttendances(this.dataEvent);
  }

  pdfEvento() {

    function getEstadoTexto(estado) {
      switch (estado) {
        case 0:
          return 'En Curso';
        case 1:
          return 'Pendiente';
        case 2:
          return 'Finalizado';
        default:
          return '';
      }
    }

    const tableHeader = ['ID', 'Nombre', 'Fecha', 'Estado', 'Monto recaudado (bs)'];
    const tableData = this.dataEvento.map(evento => [
      evento.id,
      evento.nombre,
      evento.fecha,
      getEstadoTexto(evento.estado), // Usar la función para obtener el texto del estado
      evento.monto_recaudado
    ]);

    const table = {
      table: {
        widths: ['auto', '*', 'auto', 'auto', 'auto'],
        headerRows: 1,
        body: [tableHeader, ...tableData]
      }
    };

    const tiempo = moment(new Date()).format('YYYY-MM-DD');

    const header = { text: 'Lista de eventos', style: 'header', alignment: 'center' };
    const address = { image: this.foto, width: 30, height: 30 };
    const addressText = { text: 'OTB Barrio Universitario Alto\nAvenida Petrolera Km 3 1/2\nCochabamba - Bolivia' };
    const dateText = { text: `Fecha: ${tiempo}\n`, margin: [0, 0, 10, 20] };

    const content = [
      header,
      { alignment: 'right', stack: [address, addressText] },
      { alignment: 'left', stack: [dateText] },
      table
    ];
    let documentDefinition;
     documentDefinition = {
      pageSize: 'A4',
      content: content,
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] }
      }
    };

    const pdf = pdfMake.createPdf(documentDefinition);
    pdf.open();

}
}
