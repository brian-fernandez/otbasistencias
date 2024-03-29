import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AngularMaterialModule } from './angular-material.module';
import { LoginComponent } from './auth/login/login.component';

import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMatPaginatorIntl } from './paginator-ES';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { EscanQrComponent } from './escanQr/escanQr.component';
import { UserListComponent } from './afiliado/user-list/user-list.component';
import { UserCreateComponent } from './afiliado/user-create/user-create.component';
import { CreateAfiliadoComponent } from './afiliado/create-afiliado/create-afiliado.component';
import { CreateInquilinoComponent } from './afiliado/create-inquilino/create-inquilino.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ListPagosComponent } from './pagos/list-pagos/list-pagos.component';
import { CreatePagoComponent } from './pagos/create-pago/create-pago.component';
import { PdfPagoComponent } from './PDF/pdf-pago/pdf-pago.component';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListEventComponent } from './event/list-event/list-event.component';
import { EventidComponent } from './event/eventid/eventid.component';
import { EventQrComponent } from './event/event-qr/event-qr.component';
import { NgQrScannerModule, QrScannerComponent } from 'angular2-qrscanner';
import { PdfProfileComponent } from './PDF/pdf-profile/pdf-profile.component';
import { PdfCredentialComponent } from './PDF/pdf-credential/pdf-credential.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineComponent } from './reporte/line/line.component';


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AlertComponent } from './alerts/alert/alert.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { SearchUserComponent } from './event/searchUser/searchUser.component';
import { WidgetEventoComponent } from './event/widget-evento/widget-evento.component';
import { ToastrModule } from 'ngx-toastr';
import { ListTransaccionesComponent } from './pagos/list-transacciones/list-transacciones.component';
import { DetailTransaComponent } from './pagos/detail-transa/detail-transa.component';
// Registra la localización en español
registerLocaleData(localeEs);
// import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    LoginComponent,
    LoadingComponent,
    HomeComponent,
    // componente inquilino-afiliado
    UserListComponent,
    UserCreateComponent,
    CreateAfiliadoComponent,
    CreateInquilinoComponent,
    //event
    CreateEventComponent,
    ListEventComponent,
    EventidComponent,
    EventQrComponent,
    WidgetEventoComponent,
    EscanQrComponent,
    SearchUserComponent,
    //perfil,
    ProfileDetailsComponent,
    EditProfileComponent,
    //user
    ListUserComponent,
    CreateUserComponent,
    ReporteComponent,
    ProyectosComponent,

    //pagos
    ListPagosComponent,
    CreatePagoComponent,
    ListTransaccionesComponent,
    DetailTransaComponent,

    
    //PDFS

    PdfPagoComponent,
    PdfProfileComponent,
    PdfCredentialComponent,


    //Grafix
    LineComponent,


    AlertComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    NgxMatTimepickerModule,
    HttpClientModule,
    QRCodeModule,
    NgQrScannerModule,
    NgxChartsModule,
    ToastrModule.forRoot(),


  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
