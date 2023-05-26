import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationComponent } from '../navigation/navigation.component';
import { DashboardComponent } from './dashboard.component';
import { AngularMaterialModule } from '../angular-material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule
  ],
  providers: [] ,
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
