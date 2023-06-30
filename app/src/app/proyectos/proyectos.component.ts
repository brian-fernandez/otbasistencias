import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UtilsService } from '../services/Utils.service';
export interface UserData {
  id:string;
  titulo:string;
  fecha:string;
  categoria:string;
  encargado: string;
  estado:any;
  descripcion:string;
  idcategoria:number;
}
const DATA = [
  {
    "id":"2",
    "titulo":"Instalacion de gas",
    "fecha":"2023/06/21",
    "categoria":"GAS",
    "idcategoria":2,
    "encargado":"Antonio  Alvarez",
    "estado":null,
    "descripcion":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veniam eos sapiente consectetur officiis, ex aut tempora. Assumenda possimus doloribus ut culpa? Molestias alias dolorem qui ipsam nulla facere illo."
  },
  {
    "id":"1",
    "titulo":"Cambio de luz",
    "fecha":"2023/05/23",
    "categoria":"LUZ",
    "idcategoria":3,
    "encargado":"Antonio Alvarez",
    "estado":2,
    "descripcion":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veniam eos sapiente consectetur officiis, ex aut tempora. Assumenda possimus doloribus ut culpa? Molestias alias dolorem qui ipsam nulla facere illo."
  }
  ]
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'asunto', 'categoria','fecha','creadopor','estado','acciones'];
  dataSource: MatTableDataSource<UserData> | any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  edit: any;
  info: any;

  constructor(
    private router:Router,
    private utils:UtilsService
  ) {
    this.dataSource = new MatTableDataSource(DATA);
    console.log(this.dataSource);
    
   }

  ngOnInit() {
    this.edit = {

    }
    this.info = {

    }
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
    this.router.navigateByUrl("home/nuevo-Usuario");
  }
  handleDateClick() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'block';
    
  }
  EditModal(any:any) {
    this.edit = {
      id:any.id,
      titulo:any.titulo,
      categoria:any.categoria,
      fecha:any.fecha,
      responsable:any.encargado,
      descripcion:any.descripcion,
      idcategoria:any.idcategoria
    }
    console.log(this.edit);
    
    const modal = document.getElementById('myModalEdit');
    modal!.style.display = 'block';
    
  }
  modalInfo(any:any){
    this.info = {
      id:any.id,
      titulo:any.titulo,
      categoria:any.categoria,
      fecha:any.fecha,
      responsable:any.encargado,
      descripcion:any.descripcion,
      idcategoria:any.idcategoria
    }
    const modal = document.getElementById('modalInfo');
    modal!.style.display = 'block'
  }
  deltedModal(){
    const modal = document.getElementById('modeDeleted');
    modal!.style.display='block';
  }
  closeModal() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'none';
  }
  closeModalEdit() {
    const modal = document.getElementById('myModalEdit');
    modal!.style.display = 'none';
  }
  closeModalDeleted() {
    const modal = document.getElementById('modeDeleted');
    modal!.style.display = 'none';
  }
  closeModalInfo(){
    const modal = document.getElementById('modalInfo');
    modal!.style.display = 'none';
  }
  addProyect(){
    const modal = document.getElementById('myModal');
    this.utils.openSnackBar('Se creo nuevo proyecto');
     modal!.style.display = 'none';
  }
  EditProyect(){
    const modal = document.getElementById('myModalEdit');
    this.utils.openSnackBar('Se edito el proyecto');
     modal!.style.display = 'none';
  }


}
