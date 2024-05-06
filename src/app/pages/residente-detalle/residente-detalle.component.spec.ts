import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenteDetalleComponent } from './residente-detalle.component';

describe('ResidenteDetalleComponent', () => {
  let component: ResidenteDetalleComponent;
  let fixture: ComponentFixture<ResidenteDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenteDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
