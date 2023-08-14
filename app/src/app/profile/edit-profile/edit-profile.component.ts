import { UserService } from 'src/app/services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(
    private userService:UserService,
    private route: ActivatedRoute,
    private utils:UtilsService,
    private fb:FormBuilder,
    private router:Router

  ) {
    this.lg = this.fb.group({
      password: [''],
      passwordrep : ['']
    })
   }

  ngOnInit() {
    this.statusImg = 0;
    this.datauser = {
      nombre:"",
      apellido:"",
      telefono:"",
      celular:"",
      calle:"",
      direccion:"",
      email:"",
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
        this.datauser = this.user;
        this.image = params.src_foto;
        this.imageReload = params.src_foto;


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
          formData.append('nombre', this.datauser.nombre);
          formData.append('apellido', this.datauser.apellido);
          formData.append('direccion', this.datauser.direccion);
          formData.append('celular', this.datauser.celular);
          formData.append('telefono', this.datauser.telefono);
          formData.append('email', this.datauser.email);
          formData.append('n_domicilio', this.datauser.n_domicilio);
          formData.append('calle', this.datauser.calle);
          if (this.datauser.statusId == 1) {
            formData.append('src_foto', this.datauser.src_foto);
          }
          this.userService.editUser(this.id,formData,this.datauser.src_foto).subscribe(
            async (params:any) => {
              this.utils.openSnackBar(params.message);
              this.getUser(this.id);
              this.statusImg = 0;
            }, err => {


            }
          )
        }
      } )

    }

    editCarnet(){
      this.utils.openaAlert('¿Seguro que desea guardar los cambios?','alerta').subscribe(result =>{
        if (result) {
          this.userService.editCarnet(this.id,this.carnetnuevo).subscribe(
            async (params:any) => {
              this.changeci = 0;
              this.utils.openSnackBar(params.message);
            }
          ), (error) =>{

          }
        }
      })
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
