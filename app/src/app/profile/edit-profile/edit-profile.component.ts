import { UserService } from 'src/app/services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface User {
  id: number
  inquilino_de: any
  id_encargado: number
  nombre: string
  apellido: string
  direccion: string
  telefono: string
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
  tokenFCM: string
  cargo_id: number
  created_at: string
  updated_at: string
  deleted_at: any
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  user: any;
  changeci:any;
  changepassword:any;
  datauser:any;
  image: string;
  imageReload: any;
  statusImg:any;
  id: any;
  userForm:FormGroup;
  carnetnuevo : any;
  contraseña:any;
  lg:FormGroup;
  lgData:FormGroup;
  lgCi:FormGroup;
  constructor(
    private userService:UserService,
    private route: ActivatedRoute,
    private utils:UtilsService,
    private fb:FormBuilder,
    private router:Router

  ) {

    this.lgData = this.fb.group({
      nombre : [ '' ,[Validators.required,Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido : ['',[Validators.required,Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],
      celular : ['',[Validators.required,Validators.pattern('[0-9]+'),Validators.maxLength(8),Validators.minLength(8)]],
      email : ['',[Validators.email]],  ci : ['',[Validators.required,Validators.maxLength(8),Validators.pattern('[0-9]+')]],
      calle : ['calle 1'],
      direccion : ['',[Validators.maxLength(255)]],
      n_domicilio : ['S/N',[Validators.maxLength(10)]],
      telefono : ['',[Validators.pattern('[0-9]+'),Validators.maxLength(7),Validators.minLength(7)]],

    })


    this.lgCi = this.fb.group({
      ci : ['',[Validators.required,Validators.maxLength(8),Validators.minLength(6), Validators.pattern('[0-9]+')]],
    })

    this.lg = this.fb.group({
      password: [''],
      passwordrep : ['']
    })
   }

  ngOnInit() {
    this.statusImg = 0;
    this.datauser = {

    }
    this.changeci=0;
    this.changepassword=0;


    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUser(this.id);
    });

    this.userForm = this.fb.group({
      src_foto: null,
    });
  }


  getUser(id){
    this.userService.getUserEdit(id).subscribe(
     async (params:any) => {

      this.carnetnuevo = params.ci;
        this.user = params;

        this.image = params.src_foto;
        this.imageReload = params.src_foto;

        this.lgData.patchValue({
          nombre: this.user.nombre,
          apellido: this.user.apellido,
          celular: this.user.celular,
          email: this.user.email,

          calle: this.user.calle,
          direccion: this.user.direccion,
          n_domicilio: this.user.n_domicilio,
          telefono: this.user.telefono
        });
        this.lgCi.patchValue({
          ci: this.user.ci,
        })

      }, (error)=>{


      }
      )
    }

    openFileDialog(): void {
      this.fileInput.nativeElement.click();

    }
    onFileSelected(event: any): void {
     this.datauser.src_foto = event.target.files[0];
     this.image = URL.createObjectURL(this.datauser.src_foto);
     this.statusImg = 1;
     this.datauser.statusId = 1;
    }



    reloadimg(){
      this.image = this.imageReload;
      this.statusImg = 0;
      this.datauser.statusId = 0;
    }
    reloaData(){
      this.getUser(this.id);
    }

    perfil(){
      this.router.navigate(['home/perfil/',this.id]);
    }

    editUser(){

      this.utils.openaAlert('¿Seguro que desea guardar los cambios?','alerta').subscribe(result =>{
        if (result) {
          const formData = new FormData();
          formData.append('nombre', this.lgData.value.nombre);
          formData.append('apellido', this.lgData.value.apellido);
          formData.append('direccion', this.lgData.value.direccion);
          formData.append('celular', this.lgData.value.celular);
          formData.append('telefono', this.lgData.value.telefono);
          formData.append('email', this.lgData.value.email);
          formData.append('n_domicilio', this.lgData.value.n_domicilio);
          formData.append('calle', this.lgData.value.calle);
          if (this.datauser.statusId == 1) {
            formData.append('src_foto', this.datauser.src_foto);
          }
          this.userService.editUser(this.id,formData,this.datauser.src_foto).subscribe(
            async (params:any) => {
              if (this.datauser.statusId === 1) {
                const formData2 = new FormData();
                formData2.append('key', "eb7e36f522b9441a645e4f1714c121b4");
                formData2.append('image', this.datauser.src_foto);
                this.uploadImg(formData2,this.id);
              }
              this.utils.openSnackBar(params.message);

            }, err => {


            }
          )
        }
      } )

    }
    uploadImg(img,id){


      this.userService.subdominioimg(img).subscribe(
        async (params:any) => {

          this.userService.uploadImg(params.data.url,id).subscribe(
            async (params:any) => {
              this.getUser(this.id);
              this.statusImg = 0;


            }
          )

        }
      )


    }
    editCarnet() {



      this.utils.openaAlert('¿Seguro que desea guardar los cambios?', 'alerta').subscribe(
        async (result: any) => {
          if (result) {
            this.userService.editCarnet(this.id, this.lgCi.value.ci).subscribe(
              async (params: any) => {
                this.changeci = 0;
                this.utils.openSnackBar(params.message);
                this.getUser(this.id);
              },
              (error) => {


                if (error.error.errors.ci[0]) {
                  this.utils.openSnackBar('El número de carnet ya está en uso.');
                }
              }
            );
          }
        }
      );
    }



    setestado(){


      this.utils.openaAlert('Cambiar estado','edicion').subscribe(result => {
        if (result) {
         this.userService.setEstado(this.id).subscribe(
          async (params:any) => {

            this.getUser(this.id);
            this.utils.openSnackBar('El estado fue cambiado correctamente');
          }, err => {
            this.utils.openSnackBar('Error en la conexión');
          }
         )
        } else {

        }
      });

    }

    changepasssowrd(){

      this.utils.openaAlert('¿Seguro que de seas cambiar la contraseña?','alerta').subscribe(
        async (params:any) => {
            if (params) {
              if (this.lg.value.password === this.lg.value.passwordrep) {
                this.userService.editpassword(this.id,this.lg.value.password).subscribe(
                  async (params:any) => {
                      this.getUser(this.id);
                      this.utils.openSnackBar('La contraseña fue cambiada exitosamente');
                      this.changepassword = 0;
                  }, (err) =>{
                    if (err.error.errors.new_password) {
                      this.utils.openSnackBar('La nueva contraseña debe tener al menos 6 caracteres.')
                    }else{
                      this.utils.openSnackBar('Error de conexión');
                    }

                  }
                )
            }else{
              this.utils.openSnackBar('La contraseña no coincide');
            }
            }
        }
      )


    }
  }
