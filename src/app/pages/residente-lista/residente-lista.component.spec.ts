import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenteListaComponent } from './residente-lista.component';

describe('ResidenteListaComponent', () => {
  let component: ResidenteListaComponent;
  let fixture: ComponentFixture<ResidenteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenteListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
