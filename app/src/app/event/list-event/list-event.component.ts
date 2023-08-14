import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
export interface UserData {
  id: number
  nombre: string
  descripcion: string
  fecha: string
  hora_inicio: string
  hora_fin: string
  lugar: string
  obligatorio: number
  obligatorio_cant: string
  encargado: Encargado
}

export interface Encargado {
  id: number
  nombre: string
  apellido: string
}
const DATA = [
  {
    "id":"1",
    "titulo":"Reunion de emergencia",
    "fecha":"2023-06-13",
    "horai":"12:00",
    "horaf":"13:00",
    "estado":2,
    "encargado":"Brian Fernandez Mercado"
  },
  {
    "id":"2",
    "titulo":"Reunion navideña 2023",
    "fecha":"2022-12-14",
    "horai":"16:00",
    "horaf":"17:00",
    "estado":2,
    "encargado":"Brian Fernandez Mercado"
  }
  ]
@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {


  displayedColumns: string[] = ['id', 'Titulo', 'fecha','horai','horaf','encargado','estado','acciones'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listEvent: any;

  constructor(
    private router:Router,
    private userService:UserService
  ) {



  }
  ngOnInit() {
  this.getList();
  }


  applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addnew(){
    this.router.navigateByUrl("home/nuevo-evento");
  }

  getList(){
    this.userService.getlistEvent().subscribe(
      async (params:any) => {
        this.listEvent = params;
        this.dataSource = new MatTableDataSource(this.listEvent);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  profile(id){

    this.router.navigate(['home/perfil/',id]);
  }
  text(id):any{
    if (id === 0) {
      return 'En curso';
    }
    if (id===1) {
      return 'Pendiente';
    }
    if (id===2) {
      return 'Finalizado';
    }
  }

  showEvent(id){
    this.router.navigate(['home/evento/',id]);
  }
}
