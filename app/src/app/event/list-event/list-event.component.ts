import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface UserData {
  id:string;
  titulo:string;
  fecha:string;
  horai:string;
  horaf: string;
  encargado:string;
  estado:any;
}
const DATA = [
  {
    "id":"1",
    "titulo":"Reunion de emergencia",
    "fecha":"2023-06-13",
    "horai":"12:00",
    "horaf":"13:00",
    "estado":1,
    "encargado":"Brian Fernandez Mercado"
  },
  {
    "id":"2",
    "titulo":"Reunion navideña 2023",
    "fecha":"2023-12-14",
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

  constructor(
    private router:Router
  ) {
    this.dataSource = new MatTableDataSource(DATA);
    console.log(this.dataSource);
    
  }
  ngOnInit() {
  }


  applyFilter(event: Event) {
    console.log(event);
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addnew(){
    this.router.navigateByUrl("home/nuevo-evento");
  }
}
