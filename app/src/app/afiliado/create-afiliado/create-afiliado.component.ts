import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Data, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/Utils.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-afiliado',
  templateUrl: './create-afiliado.component.html',
  styleUrls: ['./create-afiliado.component.css']
})
export class CreateAfiliadoComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  data:any
  imagenUrl!: SafeUrl;
  imagenBase64!: string;
  lg:FormGroup;
  statusImg:any;
  image: string;
  idcreate: any;
  id: any;
  constructor(private sanitizer: DomSanitizer,
    private fb:FormBuilder,
    private userService:UserService,
    private UtilsService:UtilsService,
    private auth:AuthService,
    private router:Router){
    this.lg = this.fb.group({
      nombre : ['',[Validators.required,Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],

      apellido : ['',[Validators.required,Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]],

      celular : ['',[Validators.required,Validators.pattern('[0-9]+'),Validators.maxLength(8),Validators.minLength(8)]],
      email : ['',[Validators.email]],
      ci : ['',[Validators.required,Validators.maxLength(8),Validators.pattern('[0-9]+')]],
      calle : ['calle 1'],
      direccion : ['Avenida Petrolera Km 3 1/2 - Piedras blancas',[Validators.maxLength(255)]],
      n_domicilio : ['S/N',[Validators.maxLength(10)]],
      telefono : ['',[Validators.pattern('[0-9]+'),Validators.maxLength(7),Validators.minLength(7)]],
      contraseña : ['',[Validators.required]],
      repcontraseña : ['',[Validators.required]],

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


  ngOnInit(){
    this.image = './../../../assets/img/avatardefault.png';
this.statusImg=0;
   this.data = {

   }
   this.idresposable();
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
  reloadimg(){
    this.image = './../../../assets/img/avatardefault.png';
    this.statusImg = 0;
    this.data.statusId = 0;
  }

  idresposable(){
    this.userService.get().subscribe(
      async (params:any) => {
          this.id = params;
      }
     )

  }

  send(){

   this.data.cargo = 1;
   this.data.inquilino = '' ;
   this.data.type = 'afiliado'






    // this.lg.value.apellido = this.lg.value.apellidop + ' ' +this.lg.value.apellidom
    const formData = new FormData();
    formData.append('nombre', this.lg.value.nombre);
    formData.append('apellido', this.lg.value.apellido );
    formData.append('direccion',this.lg.value.direccion);
    formData.append('telefono', this.lg.value.telefono);
    formData.append('calle', this.lg.value.calle);
    formData.append('n_domicilio', this.lg.value.n_domicilio);
    formData.append('cargo_id', this.data.cargo);

    formData.append('password', this.lg.value.contraseña);
    formData.append('inquilino_de', this.data.inquilino);
    formData.append('id_encargado', this.id.id);
    formData.append('ci', this.lg.value.ci);
    formData.append('type', this.data.type);
    formData.append('celular', this.lg.value.celular);
    if (this.data.statusId===1) {
      formData.append('src_foto', this.data.src_foto);
    }
    if (this.lg.value.email){
      formData.append('email', this.lg.value.email);
    }


    this.UtilsService.openaAlert('¿Estás seguro de crear el siguiente afiliado?','alerta').subscribe(
      (result:any)=>{
        if (result) {
          this.userService.registerAfiliado(formData).subscribe(
            async (params:any) => {
              if (this.data.statusId === 1) {
                const formData2 = new FormData();
                formData2.append('key', "eb7e36f522b9441a645e4f1714c121b4");
                formData2.append('image', this.data.src_foto);
                this.uploadImg(formData2,params.id);
                this.idcreate = params.id;
              }else{
                this.router.navigate(['home/lista']);
              }


            } ,(error)=>{


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
        this.userService.uploadImg(params.data.url,id).subscribe(
          async (params:any) => {


            this.router.navigate(['home/ista']);

          },err =>{

          }
        )

      }
    )


  }
}
