import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';

export interface user {
  nombre: string;
  cargo: string;
  CI: string;
}

interface Food {
  value: string;
  viewValue: string;
}

//se cambio con los valores que devuelve el servicio
export interface State {
  id:number;
  img: string;
  name: string;
  ci: string;
  cel:string;
  calle:string
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('seleccion') myMatSelect!: any;
  selectedValue!: string;
  stateCtrl = new FormControl('');
  data!: {};
  user?: any;
  select: any;
  constructor(private _snackBar: MatSnackBar) { 
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );

  }
  states: State[] = [
    {
      id:1,
      name: 'Brian Fernandez Mercado',
      ci: '45676243',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      img: '../../assets/img/avatar.jpg',
      calle:'Calle 2',
      cel: '69489025'
    },
    {
      id:2,
      name: 'Anabel Antonia salvatierra',
      ci: '45645376',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      img: '../../assets/img/avatar.jpg',
      calle:'Calle 2',
      cel: '69489025'
    },
    {
      id:3,
      name: 'Anabel Anguz mme',
      ci: '55436243',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      img: '../../assets/img/avatar.jpg',
      calle:'Calle 2',
      cel: '69489025'
    },
    {
      id:4,
      name: 'Rene Alejandro Martinez',
      ci: '25436223',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      img: '../../assets/img/avatar.jpg',
      calle:'Calle 2',
      cel: '69489025'
    },
  ];

  foods: Food[] = [
    {value: '1', viewValue: 'Admin'},
    {value: '2', viewValue: 'Pagos'},
    {value: '3', viewValue: 'Registros'},
  ];
  filteredStates!: Observable<State[]>;
  ngOnInit() {
    const miObjetoRecuperado = localStorage.getItem('data');
    let objetoRecuperado: any = null;
    
    if (miObjetoRecuperado !== null) {
      objetoRecuperado = JSON.parse(miObjetoRecuperado);
    }
    this.user= objetoRecuperado;
    console.log(this.user);
  
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  onOptionSelected(data:any){

  }
  send(data:any){
    this.select = data;
  }

  removed(){
    delete this.select;
    this.stateCtrl.reset();
    
  }

  addrol(){

  }
  handleDateClick() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'block';
    
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    modal!.style.display = 'none';
  }


  openSnackBar() {
    delete this.select;
    this.stateCtrl.reset();
    const modal = document.getElementById('myModal');
    modal!.style.display = 'none';
    this._snackBar.open('Se añadio el rol ', 'Cerrar', {
      horizontalPosition: "start",
      verticalPosition: "bottom",
      duration:2000
    });
  }
}
