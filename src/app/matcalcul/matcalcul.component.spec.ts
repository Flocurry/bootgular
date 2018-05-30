import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatcalculComponent } from './matcalcul.component';

describe('MatcalculComponent', () => {
  let component: MatcalculComponent;
  let fixture: ComponentFixture<MatcalculComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatcalculComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatcalculComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
