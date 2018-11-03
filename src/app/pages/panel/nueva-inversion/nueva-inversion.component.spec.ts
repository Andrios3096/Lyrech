import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaInversionComponent } from './nueva-inversion.component';

describe('NuevaInversionComponent', () => {
  let component: NuevaInversionComponent;
  let fixture: ComponentFixture<NuevaInversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaInversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
