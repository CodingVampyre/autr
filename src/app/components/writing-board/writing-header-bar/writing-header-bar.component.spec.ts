import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingHeaderBarComponent } from './writing-header-bar.component';

describe('WritingHeaderBarComponent', () => {
  let component: WritingHeaderBarComponent;
  let fixture: ComponentFixture<WritingHeaderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingHeaderBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingHeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
