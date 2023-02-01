import { TestBed } from '@angular/core/testing';

import { SindicoService } from './sindico.service';

describe('SindicoService', () => {
  let service: SindicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SindicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
