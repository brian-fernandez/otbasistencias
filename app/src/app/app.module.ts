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
import { UserListComponent } from './user/user-list/user-list.component';
import { CustomMatPaginatorIntl } from './paginator-ES';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { CreateAfiliadoComponent } from './user/create-afiliado/create-afiliado.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CreateEventComponent } from './event/create-event/create-event.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    LoginComponent,
    LoadingComponent,
    HomeComponent,
    UserListComponent,
    UserCreateComponent,
    CreateAfiliadoComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule 
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
