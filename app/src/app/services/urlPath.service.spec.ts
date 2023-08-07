/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UrlPathService } from './urlPath.service';

describe('Service: UrlPath', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlPathService]
    });
  });

  it('should ...', inject([UrlPathService], (service: UrlPathService) => {
    expect(service).toBeTruthy();
  }));
});
