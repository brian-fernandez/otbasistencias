import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import * as moment from 'moment';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';



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
  @ViewChild('liveToast') liveToast: ElementRef | undefined;




  createShow: boolean;
  user: any;
  pagosPendientes: Pago[] = [
    { id: 1, asunto: 'Instalacion de gas', categoria: "GAS" },
    { id: 2, asunto: 'Cambio de luz', categoria: "LUZ" },
    { id: 3, asunto: 'Arreglo en la calle 2', categoria: "OTROS" },
    { id: 4, asunto: 'Plantacion de nuevos arboles', categoria: "MEDIO-AMBIENTE" },
  ];
  lg: any;
  observador: boolean;
  mintime: string;
  check: any;
  listAsunto: any;
  constructor(
    private router: Router,
    private utils: UtilsService,
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {

  }
  toppings: any;
  calendarOptions!: CalendarOptions;
  events: any;
  data: any;
  selectedTimeInit: any
  selectedTimeEnd: any
  check1: any;
  check2: any;
  dataEvent: any;


  ngOnInit() {
    this.getListEvent();
    this.timeupdate()
    this.getListAsunto()
    this.lg = this.fb.group({
      nombre: ['', Validators.required],
      fecha: [''],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      descripcion: ['', Validators.required],
      lugar: ['',Validators.required],
      obligatorio: [],
      obligatorio_cant: ['10'],

    })
    this.observador = false;
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
      eventClassNames (eventInfo):any {

        if (eventInfo.event.extendedProps['estado'] === 2) {

          return 'bg-danger text-light'; // Clase CSS para eventos pasados
        }

        if (eventInfo.event.extendedProps['estado'] === 0) {
          return 'bg-success text-light '; // Clase CSS para eventos futuros
        }
        if (eventInfo.event.extendedProps['estado'] === 1) {
          return 'bg-warning text-dark '; // Clase CSS para eventos futuros
        }
      },
    }
  }

  getListEvent(){
    this.userService.getlistEvent().subscribe(
      async (params:any) => {
        this.events = params.map(event => {
          const start = `${event.fecha}T${event.hora_inicio}`;
          const end = `${event.fecha}T${event.hora_fin}`;
          return {
            title: event.nombre,
            start: start,
            end: end,
            extendedProps:{id:event.id,estado:event.estado}
          };
        });


      }
    )
  }

getListAsunto(){
  this.userService.getListEvents().subscribe(
    async (params:any) => {
      this.listAsunto = params;
      for (const pago of this.listAsunto) {
        pago.seleccionado = false;
      }


    }
  )
}


  timeupdate() {
    this.mintime = moment(new Date()).format('HH:mm a');
    setTimeout(() => {
      this.timeupdate();
    }, 1000);
  }

  pagosSeleccionados: Pago[] = [];

  toggleSeleccion(pago: any): void {
    pago.seleccionado = !pago.seleccionado;

    if (pago.seleccionado) {
      this.pagosSeleccionados.push(pago.id);
    } else {
      const index = this.pagosSeleccionados.indexOf(pago.id);
      if (index !== -1) {
        this.pagosSeleccionados.splice(index, 1);
      }
    }



  }

  handleDateClick(arg: any) {
    this.data = arg;
    let datos = arg.date;
    let tiempo = moment(new Date()).format('YYYY-MM-DD');
    datos = moment(datos).format('YYYY-MM-DD');
    if (moment(tiempo).isAfter(datos)) {
      return this.utils.openSnackBar('La fecha es anterio a la actual');
    } {
      return this.createShow = true;
    }
  }

  closeModal() {
    this.createShow = false;
  }
  show(arg: any) {
    this.router.navigate(['/home/evento/', arg.event.extendedProps.id]);
  }
  obligacion(event) {


    if (event.checked) {
      this.check = event.checked;
      this.lg.value.obligatorio = true;
      this.lg.get('obligatorio_cant').setValidators(Validators.required);
    } else {
      this.check = false;
      this.lg.value.obligatorio = false;
      this.lg.get('obligatorio_cant').clearValidators()
    }

  }


  enabled(): any {
    if (this.lg.valid) {
      return false;
    } {
      return true;
    }
  }

  sendEvent() {
   let tiempo = moment(new Date()).format('HH:mm');
    let endtiempo = moment(tiempo, 'HH:mm');
    let timepo_inicio = moment(this.lg.value.hora_inicio, "HH:mm");
    if (moment(endtiempo).isAfter(timepo_inicio)) {
      this.utils.openSnackBar('La hora de inicio es menor a la hora actual');

    } else {

      this.utils.openaAlert('¿Estas seguro de crear el siguiente evento?', 'aprobacion').subscribe(
        async (params: any) => {
          if (params) {
            this.lg.value.fecha = this.data.dateStr;
            this.userService.newEvent(this.lg, this.user.id,this.pagosSeleccionados).subscribe(
              async (params: any) => {
                this.sendNoti(params);
                this.createNoti(params);
                this.utils.openSnackBar('Evento creado exitosamente');
                this.router.navigateByUrl('home/eventos');
              }, (error) => {

                if (error.error.message) {
                  this.utils.openSnackBar(error.error.message + ' Evento: ' +error.error.evento_existente.nombre);
                }else{
                  this.utils.openSnackBar('Error de conexión');
                }

              })
          }
        }
      )
    }


  }

  sendNoti(data) {
    this.auth.getKey().subscribe(
      async (params: any) => {
        params.forEach(element => {
          this.userService.senNotif(data.evento, element).subscribe(
            async (params: any) => {
            }
          );
        });
      }
    )
  }

  createNoti(data) {
    this.userService.createNotification(data.evento, 'evento').subscribe(
      async (params: any) => {

      }, erro => {

      }
    )
  }


}
