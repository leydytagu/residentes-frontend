import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenteCrearComponent } from './residente-crear.component';

describe('ResidenteCrearComponent', () => {
  let component: ResidenteCrearComponent;
  let fixture: ComponentFixture<ResidenteCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidenteCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidenteCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
