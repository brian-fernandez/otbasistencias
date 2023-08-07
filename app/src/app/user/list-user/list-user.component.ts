import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';
import { UserService } from 'src/app/services/user.service';

export interface UserData {
  id: number
  inquilino_de: any
  id_encargado: number
  nombre: string
  apellido: string
  direccion: string
  telefono: any
  celular: string
  estado: number
  email: string
  email_verified_at: any
  src_foto: string
  n_domicilio: string
  calle: string
  ult_conexion: string
  ci: string
  type: string
  keynotifucation: any
  cargo_id: number
  created_at: string
  updated_at: string
  deleted_at: any
  nombre_rol: string
  id_rol: number
  encargado: Encargado
  role: Role
}

export interface Encargado {
  id: number
  nombre: string
  apellido: string
}

export interface Role {
  id: number
  nombre: string
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  selectedValue!: string;
  displayedColumns: string[] = ['id', 'nombre', 'ci','cargo','estado','encargado','acciones'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listUser: any;
  editId: any;
  listrol: any;
  idrol: any;

  constructor(
    private router:Router,
    private userService:UserService,
    private utilsService:UtilsService
  ) {
  }
  ngOnInit(): void{
    this.getList();
    this.listRol();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  active(type:any,id:any){

    console.log(type, id);

  }
  getList() {
    this.userService.getlist().subscribe(
      (params: any) => {
        this.listUser = params;
        console.log(this.listUser);

        this.dataSource = new MatTableDataSource(this.listUser);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  listRol(){
    this.userService.listCargo().subscribe(
      async (params:any) => {
        this.listrol = params;
      }
    )
  }
  addnew(){
    this.router.navigateByUrl("home/nuevo-Usuario");
  }
  profile(id){
    this.router.navigate(["home/perfil",id]);
  }

  edit(id,rolnombre,idrol){
    this.idrol = idrol;
    this.editId = id;
    const modal = document.getElementById('myModal');
    modal!.style.display = 'block';
  }

  openSnackBar() {
    if (this.selectedValue !== undefined) {
      this.userService.selectCargo(this.selectedValue,this.editId).subscribe(
        async (params:any) => {
          this.getList();
          this.utilsService.openSnackBar('Se actualizo el rol correctamente');
            const modal = document.getElementById('myModal');
            modal!.style.display = 'none';
        }, (error) =>{
          this.utilsService.openSnackBar('Error de conexión');

        }
      )
    }else{
        this.utilsService.openSnackBar('Selecciona un rol');
    }

  }

  closeModal() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'none';
  }
}
