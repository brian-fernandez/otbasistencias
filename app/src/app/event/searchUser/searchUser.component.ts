import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { UtilsService } from 'src/app/services/Utils.service';
import { UserService } from 'src/app/services/user.service';
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
interface Food {
  value: string;
  viewValue: string;
}
export interface DialogData {
  idAsunto:any
}

export interface Pago {
  id: any;
  descripcion: any;
  fecha: any,
  monto: any,
  seleccionado?: any
}
@Component({
  selector: 'app-searchUser',
  templateUrl: './searchUser.component.html',
  styleUrls: ['./searchUser.component.css']
})
export class SearchUserComponent implements OnInit {
  result: boolean;
  userData: any;
  bono: string;

  constructor(
    private userService:UserService,
    private user:UserService,
    public dialogRef: MatDialogRef<SearchUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private utils:UtilsService
  ) { }
  select: any;
  states: State | any;
  filteredStates!: Observable<State[]>;
  stateCtrl = new FormControl('');
  ngOnInit() {

    this.select = false;
    this.listAfiliado();
    this.bono = "";
  }
  listAfiliado() {
    this.userService.getAfiliadoPagos().subscribe(
      async (params: any) => {
        this.states = params;
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => (state ? this._filterStates(state) : this.states.slice())),
        );
      }, (error) => {


      }
    )
  }

  private _filterStates(value: string): State[] {
    const filterValue = value?.toLowerCase();


    return this.states.filter(state => {
      const nombre = state.nombre?.toLowerCase();
      const apellido = state.apellido?.toLowerCase();
      const carnet = state.ci?.toLowerCase();

      return nombre?.includes(filterValue) || apellido?.includes(filterValue) || carnet?.includes(filterValue);
    });
  }

  send(data: any) {
    this.result = data;
    this.user.getId(data.id).subscribe(
      async (params:any) => {
          this.userData = params.user;
   

      }
    )

  }
  onOptionSelected(data: any) {

  }




  add(){
     this.result = false;
     this.userService.registrarAsistencia(this.data.idAsunto,this.userData.id,this.bono).subscribe(
      async (params:any) => {
        this.dialogRef.close(true);
      },err =>{
        if (err.error.error === "El usuario ya está registrado en esta asistencia") {
          this.utils.openSnackBar('El usuario ya está registrado en esta asistencia');
        }else{
          this.utils.openSnackBar('Error de conexión');
        }
      }
     )
  }

  removed(){
    this.result = false;
  }
}
