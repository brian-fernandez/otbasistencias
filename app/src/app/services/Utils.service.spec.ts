/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilsService } from './Utils.service';
import { AngularMaterialModule } from '../angular-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Utils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService],
      imports:[AngularMaterialModule,HttpClientTestingModule]
    });
  });

  it('should ...', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));
});
