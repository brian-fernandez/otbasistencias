/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EscanQrComponent } from './escanQr.component';

describe('EscanQrComponent', () => {
  let component: EscanQrComponent;
  let fixture: ComponentFixture<EscanQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscanQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscanQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
