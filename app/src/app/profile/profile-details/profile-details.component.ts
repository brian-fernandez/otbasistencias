import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UtilsService } from 'src/app/services/Utils.service';
import { Router } from '@angular/router';
export interface UserData {
  id:string;
  foto: string;
  datos: string;
}

export interface Multas {
  id:string;
  data: {
    id:string,
    titulo:string,
    fecha:string
  };
  total: string;
  estado: string;
}

export interface Donaciones {
  id:string;
  data: {
    id:string,
    titulo:string,
    fecha:string
  };
  total: string;
  estado: string;
}

/** Constants used to fill up our data base. */
const DATA = [
{
  "id":"2",
  "Foto":"./../../../assets/img/avatar.jpg",
  "Data":{
    "nombre":"brian fernandez mercado",
    "ci":"14696849",
    "activo":1
  }
},
{
  "id":"1",
  "Foto":"./../../../assets/img/avatar.jpg",
  "Data":{
    "nombre":"Maria fernandez mercado",
    "ci":"14696849",
    "activo":0
  }
}
]

const DONACIONES = [
  {
    "id":"2",
    "data":{
      "id":"1",
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
 
      "total":20.00,
      "estado":0,
    
  }
  ]

const Multas = [
  {
    "id":"2",
    "data":{
      "id":"1",
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
 
      "total":20.00,
      "estado":0,
    
  },
  {
    "id":"3",
    "data":{
      "id":"1",
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
 
      "total":20.00,
      "estado":0,
  },
  {
    "id":"3",
    "data":{
      "id":"1",
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
 
      "total":20.00,
      "estado":0,
  },
  {
    "id":"3",
    "data":{
      "id":"1",
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
 
      "total":20.00,
      "estado":0,
  },
  {
    "id":"3",
    "data":{
      "id":"1",
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
 
      "total":20.00,
      "estado":0,
  },
  {
    "id":"3",
    "data":{
      "id":"1",
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
 
      "total":20.00,
      "estado":0,
  }
  ]

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

  constructor(
    private utils:UtilsService,
    private router:Router
  ) {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(DATA);

    this.dataSourceMultas = new MatTableDataSource(Multas);

    this.dataSourceD = new MatTableDataSource(DONACIONES);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //Multas
    this.dataSourceMultas.paginator = this.paginatorM;
    this.dataSourceMultas.sort = this.sortM;
    //donaciones
    this.dataSourceD.paginator = this.paginatorD;
    this.dataSourceD.sort = this.sortD;
   
  }

  ngOnInit() {
   this.protetip = false;
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
   
    console.log(this.protetip);
  }

  pdfCredential(){
    // this.router.navigateByUrl('pdf-credencial' );
    var datos = {
      parametro1: 'valor1',
      parametro2: 'valor2'
    };
    
    // Navega a la ruta deseada utilizando this.router.navigate
    this.router.navigate(['/pdf-credencial'], { state: datos });
    
    // Abre una nueva ventana utilizando window.open
    var newWindow = window.open('', '_blank');
    
    // Verifica si la ventana se abrió correctamente
    if (newWindow) {
      // La ventana se abrió correctamente, puedes realizar acciones adicionales si es necesario
    
      // Obtén los datos enviados utilizando window.history.state
      var datosRecibidos = newWindow.window.history.state;
  }
}


}

