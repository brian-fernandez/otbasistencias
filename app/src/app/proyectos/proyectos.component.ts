import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UtilsService } from '../services/Utils.service';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface UserData {
  id: number
  titulo: string
  descripcion: string
  fecha: string
  estado: number
  id_categoria: number
  idevento: number
  id_user: number
  created_at: string
  updated_at: string
}

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'asunto', 'categoria', 'fecha', 'creadopor', 'estado', 'acciones'];
  dataSource: MatTableDataSource<UserData> | any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  edit: any;
  info: any;
  listCategorias: any;
  listEvents: any;
  lg: FormGroup;
  lgedit: FormGroup;
  listAsuntos: any;
  id_event: any;
  id: any;
  constructor(
    private router: Router,
    private utils: UtilsService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.lgedit = this.fb.group({
      tituloe: ['', Validators.required],
      id_categoriae: ['', Validators.required],
      ideventoe: [''],
      descripcione: ['', Validators.required],
      estadoe: [1]
    })
    this.lg = this.fb.group({
      titulo: ['', Validators.required],
      id_categoria: ['', Validators.required],
      idevento: [''],
      descripcion: ['', Validators.required],
      estado: [0],
      id_user: ['']
    })
  }

  ngOnInit() {
    this.getListCategorias();
    this.getListAsunto();
    this.getLisEvents();
    this.idreponsable();
    this.edit = {

    }
    this.info = {

    }
  }
  profile(id){
    this.router.navigate(['home/perfil/',id]);
  }
  showevent(id){
    this.router.navigate(['home/evento',id])
  }
  getListCategorias() {
    this.userService.getCategoria().subscribe(
      async (params: any) => {
        this.listCategorias = params;
      }
    )
  }
  getLisEvents() {
    this.userService.getEventsActive().subscribe(
      async (params: any) => {
        this.listEvents = params;
      }
    )
  }





  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addnew() {
    this.router.navigateByUrl("home/nuevo-Usuario");
  }
  handleDateClick() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'block';

  }
  EditModal(any: any) {
    this.id_event = any.id;


    if (this.lgedit.value.idevento) {
      this.lgedit.value.estadoe=1;
    }else{
      this.lgedit.value.estadoe=0;
    }
    this.lgedit.setValue({
      tituloe: any.titulo,
      id_categoriae: any.categoria.id,
      ideventoe:any.evento,
      descripcione:any.descripcion,
      estadoe:any.estado
    });

    const modal = document.getElementById('myModalEdit');
    modal!.style.display = 'block';

  }
  modalInfo(any: any) {
    this.info = {
      id: any.id,
      titulo: any.titulo,
      categoria: any.categoria,
      fecha: any.fecha,
      encargado: any.encargado,
      descripcion: any.descripcion,
      idcategoria: any.idcategoria
    }
    const modal = document.getElementById('modalInfo');
    modal!.style.display = 'block'
  }
  deltedModal(id) {

    this.utils.openaAlert('¿Seguro que deseas eliminar el asunto?','eliminacion').subscribe(
      async (params:any) => {
         if (params) {
          this.userService.deletedAsunto(id).subscribe(
            async (params:any) => {
              this.utils.openSnackBar('Asunto eliminado exitosamente');
                this.getListAsunto();
            } ,(error)=>{
              this.utils.openSnackBar('Error de conexión');
            }
          )
         }
      }
    )

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
  closeModalInfo() {
    const modal = document.getElementById('modalInfo');
    modal!.style.display = 'none';
  }

  idreponsable(){
    this.userService.get().subscribe(
      async (params:any) => {
          this.id = params;
      }
    )
  }


  addProyect() {

    if (this.lg.value.idevento) {
      this.lg.value.estado=1;
    }else{
      this.lg.value.estado=0;
    }

      this.lg.value.id_user = this.id.id;


    this.userService.createAsunto(this.lg).subscribe(
      async (params) => {
        const modal = document.getElementById('myModal');
        this.utils.openSnackBar('Asunto creado exitosamente');
        modal!.style.display = 'none';
        this.lg.reset();
          this.getListAsunto();
      }, (error) => {
        this.utils.openSnackBar('Error de conexión');
      }
    )
  }

  getListAsunto() {
    this.userService.getListEvents().subscribe(
      async (params: any) => {
        this.listAsuntos = params;

        this.dataSource = new MatTableDataSource(this.listAsuntos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  EditProyect() {

    this.utils.openaAlert('¿Estas seguro de actualizar el siguient asunto?','alerta').subscribe(
     async (params:any) => {
      if (params) {
        this.userService.updateAsunto(this.lgedit,this.id_event).subscribe(
          async (params:any) => {
              this.utils.openSnackBar('Asunto actualizado correctamente');
              this.getListAsunto();
          }, (error)=>{
            this.utils.openSnackBar('Error de conexión');
          }
        )
      }
     }
    )
    const modal = document.getElementById('myModalEdit');
    modal!.style.display = 'none';
  }


}
