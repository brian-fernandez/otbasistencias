import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAfiliadoRoutingModule } from './create-afiliado-routing.module';
import { CreateAfiliadoComponent } from './create-afiliado.component';


@NgModule({
  declarations: [
    CreateAfiliadoComponent
  ],
  imports: [
    CommonModule,
    CreateAfiliadoRoutingModule
  ]
})
export class CreateAfiliadoModule { }
