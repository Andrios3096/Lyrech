import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmpresaComponent } from './register-empresa.component';

describe('RegisterEmpresaComponent', () => {
  let component: RegisterEmpresaComponent;
  let fixture: ComponentFixture<RegisterEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
