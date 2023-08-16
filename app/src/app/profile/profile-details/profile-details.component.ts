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
import { Keysecret } from 'src/app/config/secretKeys';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EncrDecrService } from 'src/app/services/encr-decr.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



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
  userDonaciones: any;
  data: any;
  foto: any;
  private Key = Keysecret.key;
  imagenDataUrl: string;
  httpOptions: { headers: any; };
  logo: string;
  constructor(
    private utils:UtilsService,
    private router:Router,
    private user:UserService,
    private route: ActivatedRoute,
    private http:HttpClient,
    private encrip:EncrDecrService,

  ) {
    this.httpOptions= {
      headers: new HttpHeaders({
        'Acces-Control-Allow-Origin': '*',
        'responseType':'blob'
      })
    }
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
   this.protetip = false;
   this.route.params.subscribe(params => {
    const id = params['id'];
    this.getdata(id);
    this.getDonacion(id);
  });
   this.id  = this.route.snapshot.paramMap.get('id');
   this.getdata(this.id);

   this.http.get('https://i.ibb.co/Lr9dq7K/Frame-1-2.png', { responseType: 'blob' })
   .subscribe((blob: Blob) => {
     const reader = new FileReader();
     reader.onload = () => {
       this.logo = reader.result as string;
     };
     reader.readAsDataURL(blob);
   });
  }

  active(id:any){

      this.utils.openaAlert('Cambiar estado','edicion').subscribe(result => {
        if (result) {
         this.user.setEstado(id).subscribe(
          async (params:any) => {

            this.getdata(this.id);
            this.utils.openSnackBar('El estado fue cambiado correctamente');
          }, err => {
            this.utils.openSnackBar('Error en la conexión');
          }
         )
        } else {

        }
      });




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
    this.router.navigate(['home/pdf-credencial/',this.userData.user.id]);

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
      console.log(this.userData);

      this.userData = params;

      this.http.get(this.userData.user.src_foto, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.foto = reader.result as string;
        };
        reader.readAsDataURL(blob);
      });

      this.dataSource = this.userData.user.inquilinos;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceMultas = this.userData.user.multas;
      this.dataSourceMultas.paginator = this.paginatorM;
      this.dataSourceMultas.sort = this.sortM;
    }, (err) =>{

    }
    )
  }

  getDonacion(id){
    this.user.getDonacion(id).subscribe(
      async (params:any) => {


        this.userDonaciones = params.aportes;


        this.dataSourceD = this.userDonaciones;
        this.dataSourceD.paginator = this.paginatorD;
        this.dataSourceD.sort = this.sortD;

    }
  )
}
viewProfile(id){
  this.router.navigate(['home/perfil',id]);
  // this.getdata(id);
}

edit(){
  this.router.navigate(['home/edicion/',this.id]);
}

gopago(){
  this.router.navigate(['home/nuevo-pago']);
}

showevento(id){
  this.router.navigate(['home/evento/',id]);
}
async gocredencial(){

  this.user.imageGet().subscribe(
    async (params:any) => {
        console.log(params);

    }, error =>{
      console.log(error);

    }
  )



//   const imagenBlob = await this.http.get('https://api.otb.otbuniversitarioalto.us/images/usuario/'+ this.userData.user.src_foto, {responseType: 'blob' }).toPromise();
//       const reader = new FileReader();
//       reader.readAsDataURL(imagenBlob);
//       reader.onload = () => {
//         const imagenBase64 = reader.result as string;


//   let idcode =  this.encrip.set(this.Key,this.userData.user.id);
//   let docDefinition:any;
//    docDefinition = {
//     pageSize: { width: 500, height: 320 },
//     content: [
//       // Cara Anversa
//       {
//         text: 'OTB Universitario Altos - Credencial',
//         style: 'header',
//         alignment: 'center',
//       },
//       {
//         columns: [
//           {
//             image: imagenBase64,
//             width: 100,
//             height: 100,
//           },
//           {
//             text: `Carnet: ${this.userData.user.ci}`,
//           },
//         ],
//         columnGap: 10,
//       },
//       {
//         columns: [
//           { text: 'Nombre:', width: 'auto' },
//           { text: this.userData.user.nombre, width: '*' },
//           { text: 'Apellido:', width: 'auto' },
//           { text: this.userData.user.apellido, width: '*' },
//         ],
//       },
//       {
//         columns: [
//           { text: 'Calle:', width: 'auto' },
//           { text: this.userData.user.calle, width: '*' },
//           { text: 'Número:', width: 'auto' },
//           { text: this.userData.user.numeroDomicilio, width: '*' },
//         ],
//       },
//       {
//         columns: [
//           { text: 'Teléfono:', width: 'auto' },
//           { text: this.userData.user.telefono, width: '*' },
//           { text: 'Celular:', width: 'auto' },
//           { text: this.userData.user.celular, width: '*' },
//         ],
//       },

//       // Cara Reversa
//       {
//         pageBreak: 'after',
//         text: 'OTB Universitario Altos - Credencial (Reverso)',
//         style: 'header',
//         alignment: 'center',
//       },
//       {
//         columns: [
//           {
//             qr: idcode,
//             fit: 100,
//             margin: [0, 10],
//           },
//           {
//             stack: [
//               { text: `Dirección: ${this.userData.user.direccion}` },
//             ],
//             width: '*',
//           },
//         ],
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 10, 0, 10],
//       },
//     },
//   };

//   const pdf = pdfMake.createPdf(docDefinition);
//   pdf.open();
// }
}

getpdfPagos(data){
  let documentDefinition:any;
  this.user.getpagoid(data).subscribe(
    async (params:any) => {
        this.data = params;

       if (this.data) {
        if(this.foto) {

          documentDefinition = {



           pageSize: 'A4',
           content: [
             { text: 'Pago', style: 'header',alignment: 'center' },
             {
               alignment: 'right',
               stack: [
                 { image: this.foto,width: 30, height: 30 },
                 { text: 'OTB Barrio Universitario Alto\nAvenida Petrolera Km 3 1/2\nCochabamba - Bolivia' }
               ],
             },
             {
               alignment: 'left',
               stack: [
                 // { image: 'data:image/png;base64,iVBORw0KG... (tu imagen en base64)', width: 80, height: 80 },
                 { text: `Fecha: ${this.data?.pago?.fecha}\nSeñor(es): ${this.data.multas[0]?.nombre} ${this.data.multas[0]?.apellido}\nC.I: ${this.data.multas[0]?.ci}`,margin: [ 0, 0, 10, 20 ] }
               ],

             },
             {
               table: {
                 widths: ['auto', '*', 'auto'],
                 body: [
                   ['id', 'Detalle', 'total'],
                   ...this.data.multas[0].multas.map(multa => [multa.id, `${multa.evento.titulo} - ${multa.evento.fecha}`, multa.monto]),
                 ],
               },
             },
             { text: `Total en Bs.: ${this.data.pago.total}`, style: 'total' },
             {
               columns: [
                 { qr: this.data.pago.codigo, fit: 100, margin: [0, 5] },
                 {
                   stack: [
                     { text: `Código: ${this.data.pago.codigo}` },
                     { text: `Responsable: ${this.data.pago.responsable_id.nombre} ${this.data.pago.responsable_id.apellido}` },
                   ],
                   width: 400,
                 },
               ],
             },
           ],

           styles: {
             header: { fontSize: 18, bold: true, margin: [0, 10, 0, 10] },
             total: { fontSize: 14, bold: true, margin: [0, 10, 0, 10] },
           },
         };
         }

         const pdf = pdfMake.createPdf(documentDefinition);
         pdf.open();
       }
    } , error =>[
      this.utils.openSnackBar('Error de conexión')
    ]
  )




  }


GetpdfProfile(){
  let userProfile = this.userData.user;
  console.log(userProfile);



  const profileContent = [



    {
      columns: [
        {
          width: 'auto',
          stack: [
            { image: this.foto, width: 230, height: 230 },

          ],
          alignment: 'center',
        },
        {
          width: '*',
          stack: [
            { text: `Nombre Completo:${userProfile.nombre} ${userProfile.apellido}`, style: 'profileName' },
            { text: `Email: ${userProfile.email}`, style: 'profileData' },
            { text: `Teléfono: ${userProfile.telefono}`, style: 'profileData' },
            { text: `Celular: ${userProfile.celular}`, style: 'profileData' },
            { text: `Dirección: ${userProfile.direccion}`, style: 'profileData' },
            { text: `Calle: ${userProfile.calle}`, style: 'profileData' },
            { text: `N° Domicilio: ${userProfile.n_domicilio}`, style: 'profileData' },
            { text: `CI: ${userProfile.ci}`, style: 'profileData' },
            { text: `Tipo: ${userProfile.type}`, style: 'profileData' },
            // Agregar más datos del perfil aquí
          ],
        },
      ],
      columnGap: 20,
      margin: [0, 20],
    },
  ];

  const isAfiliado = userProfile.type === 'afiliado'; // Verificar si el perfil es de tipo "afiliado"

  const inquilinos = userProfile.inquilinos || []; // Obtener la lista de inquilinos o una lista vacía si no hay

  let inquilinosSection = null;


if (isAfiliado) {
  const inquilinosTable = {
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      body: [
        ['Id','Nombre', 'CI' ], // Encabezado de la tabla
        ...inquilinos.map(inquilino => [inquilino.id,`${inquilino.nombre} ${inquilino.apellido}`, inquilino.ci]),
      ],
    },
  };


  inquilinosSection = {
    text: 'Inquilinos',
    style: 'header',
    alignment: 'left',
    margin: [0, 20],
  };

  if (inquilinos.length > 0) {
    console.log('entro');

    inquilinosSection = [inquilinosSection, inquilinosTable];
  } else {
    inquilinosSection = [inquilinosSection, 'No hay inquilinos'];
  }




  let documentDefinition :any;
   documentDefinition = {



    content: [
      {
        alignment: 'right',
        stack: [
          { image: this.logo,width: 30, height: 30 },
          { text: 'OTB Barrio Universitario Alto\nAvenida Petrolera Km 3 1/2\nCochabamba - Bolivia' }
        ],
      },


      {
        text: 'PERFIL DE USUARIO',
        style: 'header',
        alignment: 'center',
        margin: [0, 5],
      },
      {
        table: {
          body: profileContent.map(row => [row]),
        },
        layout: {
          defaultBorder: false,
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 0 : 1;
          },
          vLineWidth: function (i) {
            return 0;
          },
        },
      },
      inquilinosSection,
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      profileName: {
        fontSize: 12,
        bold: false,
        margin: [0, 10],
      },
      profileData: {
        fontSize: 12,
        margin: [0, 5],
      },
    },
  };

  const pdfDoc = pdfMake.createPdf(documentDefinition);
  pdfDoc.open();



}


}
}
