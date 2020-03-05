import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrimeScrollComponent} from './prime-scroll.component';

describe('PrimeScrollComponent', () => {
  let component: PrimeScrollComponent;
  let fixture: ComponentFixture<PrimeScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeScrollComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
