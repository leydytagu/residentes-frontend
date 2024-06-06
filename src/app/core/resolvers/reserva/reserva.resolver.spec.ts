import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { reservaResolver } from './reserva.resolver';

describe('reservaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => reservaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
