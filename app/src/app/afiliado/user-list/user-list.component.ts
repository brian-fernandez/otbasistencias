import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/Utils.service';
import { UserService } from 'src/app/services/user.service';

export interface UserData {
  id: number
  nombre: string
  type: string
  src_foto: string
  ci: string
  apellido: string
  celular: string
  telefono?: string
  email: string
  n_domicilio: string
  calle: string
  direccion: string
  id_encargado: number
  encargado: Encargado
}

export interface Encargado {
  id: number
  nombre: string
  apellido: string
}

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
  estado: any;
  iduser: any;

  constructor(private breakpointObserver: BreakpointObserver,
    private Userservice:UserService,
    private router:Router,
    private utils:UtilsService
    ) {

  }
  ngOnInit(): void{
    this.getList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  profile(id){
    this.router.navigate(['home/perfil/',id])
  }
  getList(){
      this.Userservice.listUserAll().subscribe(
        async (params:any) => {
          this.dataSource = new MatTableDataSource(params);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, (error) =>{
          console.log(error);

        }
      )
  }

  setestado(iduser){
    this.iduser = iduser;

    this.utils.openaAlert('Cambiar estado','edicion').subscribe(result => {
      if (result) {
       this.Userservice.setEstado(iduser).subscribe(
        async (params:any) => {
          console.log(params);
          this.getList();
          this.utils.openSnackBar('El estado fue cambiado correctamente');
        }, err => {
          this.utils.openSnackBar('Error en la conexión');
        }
       )
      } else {
        console.log('El diálogo fue cerrado con "No" o de alguna otra forma');
      }
    });
    // const modal = document.getElementById('myModal');
    // modal!.style.display = 'block';
  }

  btnSucces(){
      this.Userservice.setEstado(this.iduser).subscribe(
        async (params:any) => {
          console.log(params);
          this.getList();
          const modal = document.getElementById('myModal');
          modal!.style.display = 'none';
        }, (error) =>{
          console.log(error);

        }
      )
  }


  closeModal() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'none';
  }
}

