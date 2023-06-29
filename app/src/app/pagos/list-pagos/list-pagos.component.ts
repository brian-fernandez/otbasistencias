import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/Utils.service';
export interface UserData {
  id: string;
  nombre: string;
  ci: string;
  cargo: string;
  encargado: string;
  estado: any;
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
  displayedColumns: string[] = ['id', 'nombre', 'ci', 'fecha', 'fechalimite', 'encargado', 'estado', 'acciones'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource =new MatTableDataSource (DATA);
  data: any;
  info: any;
  constructor(
    private utils:UtilsService,
    private router:Router
  ) { }

  ngOnInit() {
    
  }

  addnew() {
    this.router.navigateByUrl('home/nuevo-pago');
  }

  applyFilter(event: Event) {
    console.log(event);
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  handleDateClick(row:any) {
    this.data = row;
    const modal = document.getElementById('myModal');
    modal!.style.display = 'block';
    
  }
  infoModal(row:any){
    this.info = row;
    const modal = document.getElementById('myModal2');
    modal!.style.display = 'block';
  }
  closeModalTwo() {
    const modal = document.getElementById('myModal2');
    modal!.style.display = 'none';
  }
  closeModal() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'none';
  }
add(){
  DATA[this.data.id].estado = 1;
  const modal = document.getElementById('myModal');
  modal!.style.display = 'none';
  this.utils.openSnackBar('Verificacion guardada');
}

}

