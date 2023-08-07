/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdfCredentialComponent } from './pdf-credential.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('PdfCredentialComponent', () => {
  let component: PdfCredentialComponent;
  let fixture: ComponentFixture<PdfCredentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfCredentialComponent ],
      imports:[AngularMaterialModule,HttpClientTestingModule,FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
