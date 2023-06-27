import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
export interface UserData {
  id:string;
  foto: string;
  datos: string;
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


const Multas = [
  {
    "id":"2",
    "Evento":{
      "titulo":"Reunion de emergencia",
      "fecha":"23/06/2023"
    },
    "multa":{
      "total":20.00,
      "estado":0,
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

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements AfterViewInit  {

  displayedColumns: string[] = ['Foto', 'Datos', 'Acciones'];
  dataSource: MatTableDataSource<UserData> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(DATA);
    console.log(this.dataSource);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  active(type:any,id:any){

    console.log(type, id);
    
  }
}




