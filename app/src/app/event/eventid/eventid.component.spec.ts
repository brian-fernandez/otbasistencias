/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventidComponent } from './eventid.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EventidComponent', () => {
  let component: EventidComponent;
  let fixture: ComponentFixture<EventidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventidComponent ],
      imports:[AngularMaterialModule,BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
