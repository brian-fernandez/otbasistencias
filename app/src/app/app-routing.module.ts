import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuard } from './guard/auth.guard';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { CreateEventComponent } from './event/create-event/create-event.component';


const routes: Routes = [

  {path: '', component: LoadingComponent},
  {path: 'loading', component: LoadingComponent},
  {path: 'sesion', component: LoginComponent},
  {path: 'home' , component:HomeComponent,
   children: [
    { path: 'nav', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    {path: 'lista-usuarios', component:UserListComponent , canActivate:[AuthGuard]},
    {path: 'nuevo-usuario', component: UserCreateComponent, canActivate:[AuthGuard]},
    {path: 'crear-evento', component: CreateEventComponent, canActivate:[AuthGuard]},
    // {path: 'lista-producto', component: ListaProductoComponent, canActivate:[AuthGuard]},
    // {path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate:[AuthGuard]},
]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
