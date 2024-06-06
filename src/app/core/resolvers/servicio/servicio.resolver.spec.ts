import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { servicioResolver } from './servicio.resolver';

describe('servicioResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => servicioResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
