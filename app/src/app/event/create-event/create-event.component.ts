import { AfterViewInit, Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent   {

constructor(
private router:Router
){

}

  calendarOptions!: CalendarOptions;
  events: any;
  data: any;
  selectedTimeInit: any
  selectedTimeEnd: any
  check1: any;
  check2: any;
  dataEvent:any;

    
  ngOnInit() {
    this.dataEvent = {
    
    }
    
   
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin ,timeGridPlugin],
      locale: esLocale,
      height: '100vh',
      selectable: true,
      selectMirror: true,
      themeSystem: 'bootstrap5',
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.show.bind(this),
      headerToolbar:{
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
  { title: 'event 2',start: '2023-06-30T02:00:00', end: '2023-06-30T03:44:00',extendedProps : {
    id:'1',
    titulo :'evento',
    descripcion:'',
    fecha:'2023-06-02',
    hora_fin:'18:30:00',
    hora_inicio:'19:30:00',
    obligatorio:1,
    cantMulta:'30'
  }}
]
  }

  handleDateClick(arg: any) {
    this.data = arg;
    const modal = document.getElementById('myModal');
    modal!.style.display = 'block';

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
    this.router.navigate(['/home/evento/' , arg.event.extendedProps.id]);
  }

}
