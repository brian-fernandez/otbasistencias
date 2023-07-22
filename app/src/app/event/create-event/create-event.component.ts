import { AfterViewInit, Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import * as moment from 'moment';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';
import { FormBuilder } from '@angular/forms';



export interface Pago {
  id: number;
  asunto: string;
  categoria: string;
  seleccionado?: any;

}


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent {
  
 


  createShow: boolean;
  user: any;
  pagosPendientes: Pago[] = [
    { id: 1, asunto: 'Instalacion de gas', categoria: "GAS" },
    { id: 2, asunto: 'Cambio de luz', categoria: "LUZ" },
    { id: 3, asunto: 'Arreglo en la calle 2', categoria: "OTROS" },
    { id: 4, asunto: 'Plantacion de nuevos arboles', categoria: "MEDIO-AMBIENTE" },
  ];
  observador: boolean;
  constructor(
    private router: Router,
    private utils: UtilsService,
    private _formBuilder: FormBuilder
  ) {

  }
  toppings:any;
  calendarOptions!: CalendarOptions;
  events: any;
  data: any;
  selectedTimeInit: any
  selectedTimeEnd: any
  check1: any;
  check2: any;
  dataEvent: any;


  ngOnInit() {
    this.observador = false;
    this.toppings = this._formBuilder.group({
      check: false
    });
    for (const pago of this.pagosPendientes) {
      pago.seleccionado = false;
    }

    this.user = this.utils.credentials();
    this.createShow = false;
    this.dataEvent = {

    }


    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      locale: esLocale,
      height: '100vh',
      selectable: true,
      selectMirror: true,
      themeSystem: 'bootstrap5',
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.show.bind(this),
      headerToolbar: {
        start: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      eventClassNames: function (eventInfo) {
        if (moment(eventInfo.event.end).isBefore(moment())) {

          return 'bg-danger text-light'; // Clase CSS para eventos pasados
        } else {
          return 'bg-success text-light '; // Clase CSS para eventos futuros
        }
      },
    }



    this.events = [
      { title: 'Reunion 1 para el reparo de agua', start: '2023-06-14T10:00:00', end: '2023-06-14T11:25:00' },
      { title: 'eventoooooooo', start: '2023-06-30T02:00:00', end: '2023-06-30T02:44:00' },
      // { title: 'event 2', date: '2023-06-06' },
      {
        title: 'event 2', start: '2023-06-30T02:00:00', end: '2023-06-30T03:44:00', extendedProps: {
          id: '1',
          titulo: 'evento',
          descripcion: '',
          fecha: '2023-06-02',
          hora_fin: '18:30:00',
          hora_inicio: '19:30:00',
          obligatorio: 1,
          cantMulta: '30'
        }
      }
    ]
  }
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
  }

  handleDateClick(arg: any) {
    // this.data = arg;
    // const modal = document.getElementById('myModal');
    // modal!.style.display = 'block';
    this.data = arg;
    this.createShow = true;

  }

  closeModal() {
    console.log('entro a close');

    // Close the modal
    const modal = document.getElementById('myModal');
    modal!.style.display = 'none';
  }
  show(arg: any) {
    console.log(arg.event.extendedProps.id);

    // this.router.navigateByUrl('/home/evento/'+arg.event.extendedProps.id);
    this.router.navigate(['/home/evento/', arg.event.extendedProps.id]);
  }
  obligacion(event){
    if (event.checked) {
      this.observador = event.checked;
    }else{
      this.observador = false;
    }
    
  }
}
