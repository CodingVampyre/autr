import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingBoardComponent } from './writing-board.component';

describe('WritingBoardComponent', () => {
  let component: WritingBoardComponent;
  let fixture: ComponentFixture<WritingBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
