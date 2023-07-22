import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

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
    "estado":1,
    "tipo":'Afiliado',
    "iconexion": moment(new Date()).format('hh:mm'),
  },
  {
    "id":"1",
    "nombre":"Brian Fernandez Mercado",
    "ci":"1249534863",
    "cargo":"Cajero",
    "encargado":"Antonio Alvarez",
    "estado":1,
    "tipo":'Afiliado',
    "iconexion": moment(new Date()).format('hh:mm'),
  }
  ]

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'nombre', 'ci','tipo','iconexion','encargado','estado','acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private breakpointObserver: BreakpointObserver) {

     this.dataSource = new MatTableDataSource(DATA);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

