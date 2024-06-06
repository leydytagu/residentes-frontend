import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { residenteResolver } from './residente.resolver';

describe('residenteResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => residenteResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
