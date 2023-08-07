/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventQrComponent } from './event-qr.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { QRCodeModule } from 'angularx-qrcode';
import { NgQrScannerModule } from 'angular2-qrscanner';

describe('EventQrComponent', () => {
  let component: EventQrComponent;
  let fixture: ComponentFixture<EventQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventQrComponent ],
      imports:[AngularMaterialModule,QRCodeModule,NgQrScannerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
