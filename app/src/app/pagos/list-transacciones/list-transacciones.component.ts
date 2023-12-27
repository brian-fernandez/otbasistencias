import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
export interface UserData {
  id: number
  id_user: number
  id_encargado: any
  data_multas: string
  total: string
  fecha: string
  tipo: string
  estado: string
  fecha_confirmacion: any
  created_at: string
  updated_at: string
}
@Component({
  selector: 'app-list-transacciones',
  templateUrl: './list-transacciones.component.html',
  styleUrls: ['./list-transacciones.component.css']
})
export class ListTransaccionesComponent implements OnInit {
  ListTrans: any;
  list: any;
  displayedColumns: string[] = ['id', 'afiliado','Tipo', 'total','Fecha', 'Acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
    private user:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getList();
    // this.showList(0)
  }


  ngAfterViewInit() {
 
  }

  async getList(){
  await this.user.getListTransa().subscribe(
      async (params:any) => {
        this.ListTrans = params.transacciones;
        this.list = this.ListTrans.filter((p:any) => p.estado === "pendiente");
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.list);
      }
    )
  }

  showList(any){
    let listas ;
    if (any ===  0) {
        listas = this.ListTrans.filter((p:any) => p.estado === "pendiente");
    }else{
      listas = this.ListTrans.filter((p:any) => p.estado === "cancelado");
    }
    this.list = listas;
   
    
  }

  check(id){
      this.router.navigateByUrl('home/details-transa/'+id);
  }

}
