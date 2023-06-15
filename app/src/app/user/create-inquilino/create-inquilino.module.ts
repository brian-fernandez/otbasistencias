import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInquilinoRoutingModule } from './create-inquilino-routing.module';
import { CreateInquilinoComponent } from './create-inquilino.component';


@NgModule({
  declarations: [
    CreateInquilinoComponent
  ],
  imports: [
    CommonModule,
    CreateInquilinoRoutingModule
  ]
})
export class CreateInquilinoModule { }
