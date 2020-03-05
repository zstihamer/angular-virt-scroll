import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GridReaderComponent} from './grid-reader.component';

describe('GridReaderComponent', () => {
  let component: GridReaderComponent;
  let fixture: ComponentFixture<GridReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridReaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
