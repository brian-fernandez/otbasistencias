import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
    "estado":1
  }
  ]
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nombre', 'ci','cargo','estado','encargado','acciones'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router:Router
  ) {
    this.dataSource = new MatTableDataSource(DATA);
    console.log(this.dataSource);
    
  }
  ngOnInit(): void{

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    console.log(event);
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  active(type:any,id:any){

    console.log(type, id);
    
  }

  addnew(){
    this.router.navigateByUrl("home/nuevo-Usuario");
  }
  profile(){
    this.router.navigateByUrl("home/perfil");
  }
}