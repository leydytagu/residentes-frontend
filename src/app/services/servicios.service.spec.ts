import { TestBed } from '@angular/core/testing';

import { ServiciosService } from './servicios.service';

describe('ServicioService', () => {
  let service: ServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
