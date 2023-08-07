/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdfPagoComponent } from './pdf-pago.component';
import { QRCodeModule } from 'angularx-qrcode';

describe('PdfPagoComponent', () => {
  let component: PdfPagoComponent;
  let fixture: ComponentFixture<PdfPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfPagoComponent ],
      imports:[QRCodeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
