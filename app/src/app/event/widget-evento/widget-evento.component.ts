import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const moments = require('moment');
require('moment-timezone');
@Component({
  selector: 'app-widget-evento',
  templateUrl: './widget-evento.component.html',
  styleUrls: ['./widget-evento.component.css']
})
export class WidgetEventoComponent implements OnInit {
  timestart: any;
  timeendt: any;
  percentage: number;
  @Input() dataEvents: any;
  dataEvent: any;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.getEvento();

  }


  getEvento(){
  if (this.dataEvents[0]) {
    this.dataEvent = this.dataEvents[0];
    this.timestart = this.dataEvent.hora_inicio;
    this.timeendt = this.dataEvent.hora_fin;
    if (this.dataEvent.estado === 0) {
      this.updateProgress();
    }
    if (this.dataEvent.estado === 1) {
      this.percentage = 0;
    }
    if (this.dataEvent.estado === 2 ) {
       this.percentage = 100;
    }
  }

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
    }else{
 
    }
  } else {

    this.percentage = 0;
  }

}

show(){
  this.router.navigate(['home/evento/',this.dataEvent.id])
}
}
