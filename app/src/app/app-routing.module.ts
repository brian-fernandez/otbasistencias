import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuard } from './guard/auth.guard';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';

import { CreateEventComponent } from './event/create-event/create-event.component';
import { EscanQrComponent } from './escanQr/escanQr.component';
import { UserListComponent } from './afiliado/user-list/user-list.component';
import { UserCreateComponent } from './afiliado/user-create/user-create.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CrearProyectoComponent } from './proyectos/crear-proyecto/crear-proyecto.component';
import { ListPagosComponent } from './pagos/list-pagos/list-pagos.component';
import { ListEventComponent } from './event/list-event/list-event.component';
import { CreatePagoComponent } from './pagos/create-pago/create-pago.component';
import { PdfPagoComponent } from './PDF/pdf-pago/pdf-pago.component';
import { EventidComponent } from './event/eventid/eventid.component';
import { PdfCredentialComponent } from './PDF/pdf-credential/pdf-credential.component';


const routes: Routes = [

  {path: '', component: LoadingComponent},
  
  {path: 'loading', component: LoadingComponent},
  {path: 'sesion', component: LoginComponent},
  {path: 'pdf-credencial', component: PdfCredentialComponent, canActivate:[AuthGuard]},
  {path: 'home' , component:HomeComponent,
   children: [
    { path: 'nav', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],pathMatch:'full' },
    /* Afiliados*/
    {path: 'lista', component:UserListComponent , canActivate:[AuthGuard]},
    {path: 'nuevo', component: UserCreateComponent, canActivate:[AuthGuard]},
    /* Perfil */
    {path: 'perfil', component: ProfileDetailsComponent, canActivate:[AuthGuard]},
    /*User*/
    {path: 'lista-Usuario', component: ListUserComponent, canActivate:[AuthGuard]},
    {path: 'nuevo-Usuario', component: CreateUserComponent, canActivate:[AuthGuard]},
    //evento
    {path: 'nuevo-evento', component: CreateEventComponent, canActivate:[AuthGuard]},
    {path: 'eventos', component: ListEventComponent, canActivate:[AuthGuard]},
    {path: 'evento/:id', component: EventidComponent, canActivate:[AuthGuard]},
    //reporte
    {path: 'reportes', component: ReporteComponent, canActivate:[AuthGuard]},
    //lector
    {path: 'lector', component: EscanQrComponent, canActivate:[AuthGuard]},
    //proyectos
    {path: 'proyectos', component: ProyectosComponent, canActivate:[AuthGuard]},
    {path: 'nuevo-proyecto', component: CreatePagoComponent, canActivate:[AuthGuard]},
    //pagos
    {path: 'pagos', component: ListPagosComponent, canActivate:[AuthGuard]},
    {path: 'nuevo-pago', component: CreatePagoComponent, canActivate:[AuthGuard]},
    {path: 'nuevo-pago/:id', component: CreatePagoComponent, canActivate:[AuthGuard]},
    

    {path: 'pdf-pagos', component: PdfPagoComponent, canActivate:[AuthGuard]},
   

]},
{path: '**', component: LoadingComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
