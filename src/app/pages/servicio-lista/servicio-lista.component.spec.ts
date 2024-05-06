import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioListaComponent } from './servicio-lista.component';

describe('ServicioListaComponent', () => {
  let component: ServicioListaComponent;
  let fixture: ComponentFixture<ServicioListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
