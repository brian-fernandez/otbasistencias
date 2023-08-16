import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilsService } from '../services/Utils.service';
import { AuthService } from '../services/auth.service';
import { datos } from '../alerts/alert/alert.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
export interface UserData {
  id: number
  nombre: string
  src_foto: string
  ci: string
  apellido: string
  celular: string
  telefono?: string
  email: string
  n_domicilio: string
  calle: string
  direccion: string
  ult_conexion: string
  estado: number
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  displayedColumns: string[] = ['foto','ci', 'name', 'ultconexion', 'estado'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listUser: any;
  userCount: any;
  eventCount: any;
  montorecaudado: any;

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private userService: UserService,private router:Router) {


  }

  ngOnInit() {
    this.getResident();
    this.countUser();
    this.countEvent();
    this.monto();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  noti() {
    this.router.navigateByUrl('home/lector');
  }


  getResident() {
    this.userService.getAfiliado().subscribe(
      async (params: any) => {
        this.listUser = params;
        this.listUser.sort((a, b) => {
          const fechaA = new Date(a.ult_conexion);
          const fechaB = new Date(b.ult_conexion);
          return fechaB.getTime() - fechaA.getTime();
        });

        this.dataSource = new MatTableDataSource(this.listUser);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
      }
    )
  }

  countUser(){
      this.userService.countActiveUsers().subscribe(
        async (params:any) => {
            this.userCount = params;
        }
      )
  }
  countEvent(){
      this.userService.countEventsThisMonth().subscribe(
        async (params:any) => {
            this.eventCount = params;
        }
      )
  }
  monto(){
      this.userService.montoRecaudadoMesActual().subscribe(
        async (params:any) => {
            this.montorecaudado = params;
        }
      )
  }

  showperfil(id){
    this.router.navigate(['home/perfil/',id]);
  }
}


