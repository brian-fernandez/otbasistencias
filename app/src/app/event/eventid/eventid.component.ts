import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventQrComponent } from '../event-qr/event-qr.component';
import { MatDialog } from '@angular/material/dialog';
export interface UserData {
  id:string;
  nombre:string;
  ci:string;
  cargo:string;
  encargado: string;
  estado:any;
}


const DATA = [
  {
    "id":"2",
    "nombre":"Juan Antonio Mercado",
    "ci":"1249534863",
    "cargo":"Admin",
    "encargado":"Antonio  Alvarez",
    "estado":1
  },
  {
    "id":"1",
    "nombre":"Brian Fernandez Mercado",
    "ci":"1249534863",
    "cargo":"Cajero",
    "encargado":"Antonio Alvarez",
    "estado":2
  }
  ]
@Component({
  selector: 'app-eventid',
  templateUrl: './eventid.component.html',
  styleUrls: ['./eventid.component.css']
})
export class EventidComponent implements OnInit {




  
  active: boolean;
  progress: number;
  displayedColumns: string[] = ['id', 'nombrecompleto', 'horae','horas','estado','donacion','encargado',];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  timestart: string = "00:00";
  timeendt: string = "5:30";
  percentage: number = 0;

  constructor( private router:Router,
    private dialog:MatDialog) { 
    this.dataSource = new MatTableDataSource(DATA);
    console.log(this.dataSource
      );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.updateProgress();
  }
  parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);
    return date;
  }

  updateProgress() {
    const startTime = moment(this.timestart, 'HH:mm');
    const endTime = moment(this.timeendt, 'HH:mm');
    const currentTime = moment();
    
    // Verificar si la hora actual es anterior a la hora de inicio
    if (currentTime.isBefore(startTime)) {
      this.percentage = 0; // Si aún no ha comenzado, el porcentaje es 0
    } else {
      const elapsedMilliseconds = currentTime.diff(startTime);
      const totalMilliseconds = endTime.diff(startTime);
      this.percentage = (elapsedMilliseconds / totalMilliseconds) * 100;
    }
  
    if (this.percentage < 100) {
      setTimeout(() => this.updateProgress(), 1000); // Actualizar cada segundo
    }
    console.log('end');
    
  }

  
  back(){

  }
  download(){
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
    console.log(event);
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openDialog() {
    console.log('hola');
    
    const dialogRef = this.dialog.open(EventQrComponent,{
      width:'90%',
      height:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      

      /// actualizacion de la tabla
      //datos
    });
  }
}
