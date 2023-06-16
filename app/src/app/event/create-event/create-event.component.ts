import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {


  calendarOptions!: CalendarOptions;
  events: any;
  data: any;
  selectedTimeInit:any
  selectedTimeEnd:any
  check1:any;
  check2:any;
  ngOnInit() {


    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin,interactionPlugin],
      locale: esLocale,
      height: '100vh',
      selectable: true,
      selectMirror: true,
      themeSystem:'bootstrap5',
      dateClick: this.handleDateClick.bind(this),
      eventClick:this.show.bind(this)
    };

    this.events= [
      { title: 'Reunion 1 para el reparo de agua', date: '2023-06-14' },
      { title: 'event 2', date: '2023-06-03' },
      { title: 'event 2', date: '2023-06-02' },
      { title: 'event 2', date: '2023-06-02' }
    ]
    
  }

  handleDateClick(arg:any) {
    console.log(arg);
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
show(arg:any){
  console.log(arg.event);
  
}

}
