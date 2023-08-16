import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { UtilsService } from 'src/app/services/Utils.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-inquilino',
  templateUrl: './create-inquilino.component.html',
  styleUrls: ['./create-inquilino.component.css']
})
export class CreateInquilinoComponent {

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('option', { static: true }) optionInput: MatSelect;
  data: any
  imagenUrl!: SafeUrl;
  imagenBase64!: string;
  myControl = new FormControl('');
  options:any;
  stateCtrl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  id: any;
  dataUser: {};
  lg: FormGroup<any>;
  image: string;
  statusImg: number;
  filteredStates: Observable<any>;
  dataAfiliado: any;
  idcreate: any;
  idUset: any;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private userService:UserService,
    private UtilsService:UtilsService,
    private router:Router) {
      this.lg = this.fb.group({
        nombre : ['',[Validators.required,Validators.pattern('[A-Za-záéíóúÁÉÍÓÚñÑ\s\s]*')]],
        apellidop : ['',[Validators.required,Validators.pattern('[A-Za-záéíóúÁÉÍÓÚñÑ\s\s]*')]],
        apellido : ['',[Validators.required]],
        apellidom : ['',[Validators.required,Validators.pattern('[A-Za-záéíóúÁÉÍÓÚñÑ\s\s]*')]],
        celular : ['',[Validators.required,Validators.pattern('[0-9]+'),Validators.maxLength(7),Validators.minLength(7)]],
        email : ['',[Validators.email]],
        ci : ['',[Validators.required,Validators.maxLength(8),Validators.pattern('[0-9]+')]],
        calle : ['calle 1'],
        direccion : ['Avenida Petrolera Km 3 1/2 - Piedras blancas',[Validators.maxLength(255)]],
        n_domicilio : ['S/N',[Validators.maxLength(10)]],
        telefono : ['',[Validators.pattern('[0-9]+'),Validators.maxLength(8),Validators.minLength(8)]],
        contraseña : ['',[Validators.required]],
        repcontraseña : ['',[Validators.required]],
        src_foto:  ['',[Validators.required]],

      },{ validator: this.passwordMatchValidator })
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const contraseña = control.get('contraseña');
    const confirmContraseña = control.get('repcontraseña');
    if (contraseña.value !== confirmContraseña.value) {
      return { mismatchedPasswords: true };
    }

    return null;
  }
  ngOnInit() {
    this.getList();
    this.id = false;
    this.image = './../../../assets/img/avatardefault.png';
    this.statusImg = 0;
    this.data = {

    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
      this.idreponsable();
  }


  private _filter(value: string): any[] {
    const filterValue = value?.toLowerCase();
    return this.options?.filter(state => {
      const nombre = state.nombre?.toLowerCase();
      const apellido = state.apellido?.toLowerCase();
      const carnet = state.ci?.toLowerCase();

      return nombre?.includes(filterValue) || apellido?.includes(filterValue) || carnet?.includes(filterValue);
    });
  }

  getList(){
    this.userService.getAfiliado().subscribe(
      async (params:any) => {
          this.options = params;
          this.filteredStates = this.stateCtrl.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filter(state) : this.options.slice())),
          );


      }
    )
  }

  senduser(data: any) {
    this.dataAfiliado = data;


  }

  onOptionSelected(data: any) {
     this.id =true;
  }

cancelSelect(){
  // this.optionInput.value = this.dataAfiliado.ci;
  this.id=false;
}
  openFileDialog(): void {
    this.fileInput.nativeElement.click();

  }
  onFileSelected(event: any): void {
    this.data.src_foto = event.target.files[0];
    this.image = URL.createObjectURL(this.data.src_foto);
    this.statusImg = 1;
    this.data.statusId = 1;
  }
  reloadimg() {
    this.image = './../../../assets/img/avatardefault.png';
    this.statusImg = 0;
    this.data.statusId = 0;
  }

  idreponsable(){
    this.userService.get().subscribe(
      async (params:any) => {
          this.idUset = params;
      } ,(error)=>{

      }
    )
  }


  send() {

    this.data.cargo = 1;
    this.data.type = 'inquilino'




    this.lg.value.apellido = this.lg.value.apellidop + ' ' + this.lg.value.apellidom
    const formData = new FormData();
    formData.append('nombre', this.lg.value.nombre);
    formData.append('apellido', this.lg.value.apellido);
    formData.append('direccion', this.lg.value.direccion);
    formData.append('telefono', this.lg.value.telefono);
    formData.append('calle', this.lg.value.calle);
    formData.append('n_domicilio', this.lg.value.n_domicilio);
    formData.append('cargo_id', this.data.cargo);
    formData.append('email', this.lg.value.email);
    formData.append('password', this.lg.value.contraseña);
    formData.append('inquilino_de', this.dataAfiliado.id);
    formData.append('id_encargado', this.idUset.id);
    formData.append('ci', this.lg.value.ci);
    formData.append('type', this.data.type);
    formData.append('celular', this.lg.value.celular);
    if (this.data.statusId === 1) {
      formData.append('src_foto', this.data.src_foto);
    }

    this.UtilsService.openaAlert('¿Estás seguro de crear el siguiente afiliado?', 'alerta').subscribe(
      (result: any) => {
        if (result) {
          this.userService.registerAfiliado(formData).subscribe(
            async (params: any) => {
              if (this.data.statusId === 1) {
                const formData2 = new FormData();
                formData2.append('key', "eb7e36f522b9441a645e4f1714c121b4");
                formData2.append('image', this.data.src_foto);
                this.uploadImg(formData2,params.id);
                this.idcreate = params.id;
              }else{
                this.router.navigate(['/home/lista']);
              }

            }, (error) => {
              if (error.error.error.email[0]) {
                this.UtilsService.openSnackBar('El correo electronico ya esta en uso.')
            }
            if (error.error.error.ci[0]) {
              this.UtilsService.openSnackBar('El carnet de identidad ya esta en uso.')
          }
            }
          )
        }
      }
    )

  }
  uploadImg(img,id){


    this.userService.subdominioimg(img).subscribe(
      async (params:any) => {
        console.log(params);

        this.userService.uploadImg(params.data.url,id).subscribe(
          async (params:any) => {
            this.router.navigate(['/home/lista']);
              console.log(params);

          }
        ),error =>{



        }

      }
    )


  }
}
