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

    EscanQrComponent,
    //perfil,
    ProfileDetailsComponent,
    //user
    ListUserComponent,
    CreateUserComponent,
    ReporteComponent,
    ProyectosComponent,

    //pagos
    ListPagosComponent,
    CreatePagoComponent,


    //PDFS

    PdfPagoComponent
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
    QRCodeModule
  
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
