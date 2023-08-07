import {AfterViewInit, Component, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UtilsService } from 'src/app/services/Utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';





export interface UserData {
  id:string;
  img: string;
  nombre: string;
  apellido:string;
  estado:String
}

export interface Multas {
  id:any;
  monto:any;
  asistencia:any;
  evento:{
    id:any;
    titulo:any;
    fecha:any;
  };
  pago:{
    id:any;
    fecha:any,
    responsable:{
      id:any;
      nombre:any;
      apellido:any;
    }
  }

}




@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements AfterViewInit  {
  //inquilinos data
  displayedColumns: string[] = ['Foto', 'Datos', 'Acciones'];
  dataSource: MatTableDataSource<UserData> | any;
//multas data
displayedColumnsmultas: string[] = ['data', 'total'];
dataSourceMultas: MatTableDataSource<Multas> | any;
//donaciones data
displayedColumnsD: string[] = ['data', 'total'];
dataSourceD: MatTableDataSource<Multas> | any;

  @ViewChild('paginator1') paginator!: MatPaginator;
  @ViewChild('sort1') sort!: MatSort;
  //multas
  @ViewChild('paginator2') paginatorM!: MatPaginator;
  @ViewChild('sort2') sortM!: MatSort;
  //Donaciones
  @ViewChild('paginator3') paginatorD!: MatPaginator;
  @ViewChild('sort3') sortD!: MatSort;
  progress: number;
  protetip: any;
  userData: any;
  id:any;
  users: any;
  constructor(
    private utils:UtilsService,
    private router:Router,
    private user:UserService,
    private route: ActivatedRoute

  ) {
    // Create 100 users
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(DATA);
    // this.dataSourceMultas = new MatTableDataSource(Multas);
    // this.dataSourceD = new MatTableDataSource(DONACIONES);

  }

  ngAfterViewInit() {
    // console.log('afterView');

    // this.id  = this.route.snapshot.paramMap.get('id');
    // this.getdata(this.id);
  }

  ngOnInit() {
   this.protetip = false;
   this.route.params.subscribe(params => {
    const id = params['id'];
    this.getdata(id);
  });
   this.id  = this.route.snapshot.paramMap.get('id');
   this.getdata(this.id)
  }

  active(type:any,id:any){
    console.log(type, id);
  }
  pdfProfile(){
   this.protetip = true;
    this.progress = -1;
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.utils.convertPDF("pdf",1)
        clearInterval(interval);
        this.protetip = false;
      }
    }, 100);
  }
  pdfCredential(){
    var datos = {
      parametro1: 'valor1',
      parametro2: 'valor2'
    };
    this.router.navigate(['/pdf-credencial'], { state: datos });
    var newWindow = window.open('', '_blank');
    if (newWindow) {
      var datosRecibidos = newWindow.window.history.state;
  }
}

getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
}
getdata(id){
  this.user.getId(id).subscribe(
    async (params:any) => {
      this.users = params.user;
      this.userData = params;
      this.dataSource = this.userData.user.inquilinos;
      this.dataSourceMultas = this.userData.user.multas;
      this.dataSourceD = this.userData.user.asistencia;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceMultas.paginator = this.paginatorM;
      this.dataSourceMultas.sort = this.sortM;
      this.dataSourceD.paginator = this.paginatorD;
      this.dataSourceD.sort = this.sortD;
    }, (err) =>{
      console.log(err);
    }
  )
}

viewProfile(id){
  this.router.navigate(['home/perfil',id]);
  // this.getdata(id);
}

}
