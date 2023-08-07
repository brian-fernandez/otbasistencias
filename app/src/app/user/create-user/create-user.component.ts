import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { UtilsService } from 'src/app/services/Utils.service';
import { UserService } from 'src/app/services/user.service';

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
  listcargo: any;
  constructor(private _snackBar: MatSnackBar,
     private userService: UserService,
     private utilsService:UtilsService) {
    this.listAfiliado();
    this.user = this.utilsService.credentials();
    this.listCargo();

  }
  //   {
  //     id:1,
  //     name: 'Brian Fernandez Mercado',
  //     ci: '45676243',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
  //     img: '../../assets/img/avatar.jpg',
  //     calle:'Calle 2',
  //     cel: '69489025'
  //   },
  //   {
  //     id:2,
  //     name: 'Anabel Antonia salvatierra',
  //     ci: '45645376',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
  //     img: '../../assets/img/avatar.jpg',
  //     calle:'Calle 2',
  //     cel: '69489025'
  //   },
  //   {
  //     id:3,
  //     name: 'Anabel Anguz mme',
  //     ci: '55436243',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
  //     img: '../../assets/img/avatar.jpg',
  //     calle:'Calle 2',
  //     cel: '69489025'
  //   },
  //   {
  //     id:4,
  //     name: 'Rene Alejandro Martinez',
  //     ci: '25436223',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
  //     img: '../../assets/img/avatar.jpg',
  //     calle:'Calle 2',
  //     cel: '69489025'
  //   },
  // ];
states:State | any;
  foods: Food[] = [
    { value: '1', viewValue: 'Admin' },
    { value: '2', viewValue: 'Pagos' },
    { value: '3', viewValue: 'Registros' },
  ];
  filteredStates!: Observable<State[]>;
  ngOnInit() {
    const miObjetoRecuperado = localStorage.getItem('data');
    let objetoRecuperado: any = null;
    if (miObjetoRecuperado !== null) {
      objetoRecuperado = JSON.parse(miObjetoRecuperado);
    }


  }

  private _filterStates(value: string): State[] {
    const filterValue = value?.toLowerCase();
    console.log(filterValue);

    return this.states.filter(state => {
      const nombre = state.nombre?.toLowerCase();
      const apellido = state.apellido?.toLowerCase();
      const carnet = state.ci?.toLowerCase();

      return nombre?.includes(filterValue) || apellido?.includes(filterValue) || carnet?.includes(filterValue);
    });
  }


  listAfiliado(){
    this.userService.getAfiliado().subscribe(
      async (params:any) => {
        this.states = params;
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => (state ? this._filterStates(state) : this.states.slice())),
        );
      }, (error) =>{
        console.log(error);

      }
    )
  }

  onOptionSelected(data: any) {

  }
  send(data: any) {
    this.select = data;
  }

  removed() {
    delete this.select;
    this.stateCtrl.reset();

  }


  listCargo(){
    this.userService.listCargo().subscribe(
      async (params:any) => {
        this.listcargo = params;
      }, (error) =>{
        console.log(error);

      }
    )
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
    console.log(this.selectedValue);
    if (this.selectedValue !== undefined) {
      this.userService.selectCargo(this.selectedValue,this.select.id).subscribe(
        async (params:any) => {
          this.listAfiliado();
          this.utilsService.openSnackBar('Se añadio el rol correctamente');
          delete this.select;
          this.stateCtrl.reset();
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
}
