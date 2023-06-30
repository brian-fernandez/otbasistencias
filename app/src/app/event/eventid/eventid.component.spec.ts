/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventidComponent } from './eventid.component';

describe('EventidComponent', () => {
  let component: EventidComponent;
  let fixture: ComponentFixture<EventidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventidComponent ]
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
